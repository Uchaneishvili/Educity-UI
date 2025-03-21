import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '../components/UI/Loader/Loader';
import AuthService from '../services/auth.service';

const TokenProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const location = useLocation();
  const authService = new AuthService();

  useEffect(() => {
    const validateResetToken = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
          setIsValidToken(false);
          setLoading(false);
          return;
        }

        // You can add an API call to validate the token if needed
        // For now, we'll just check if it exists
        // const response = await authService.validateResetToken(token);
        // setIsValidToken(response.success);

        // Store the token for the recovery page to use
        localStorage.setItem('reset_token', token);
        setIsValidToken(true);
      } catch (error) {
        console.error('Error validating reset token:', error);
        setIsValidToken(false);
      } finally {
        setLoading(false);
      }
    };

    validateResetToken();
  }, [location]);

  if (loading) {
    return <Loader />;
  }

  return isValidToken ? (
    children
  ) : (
    <Navigate
      to="/forget-pass"
      state={{
        error: 'Invalid or expired reset link. Please request a new one.',
      }}
    />
  );
};

export default TokenProtectedRoute;
