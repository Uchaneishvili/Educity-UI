import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { Loader } from '../../../../components/UI/Loader/Loader';

function GoogleCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract token from URL if it's in the query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userData = params.get('user');

        if (token) {
          console.log('Google callback received token');
          // If token is directly provided in URL
          const parsedUser = userData
            ? JSON.parse(decodeURIComponent(userData))
            : null;
          console.log('Parsed user data:', parsedUser);

          // Make sure we provide the exact structure expected by the login function
          await login({
            access_token: token,
            user: parsedUser,
          });

          console.log('Login successful, navigating to home');
          navigate('/');
        } else {
          console.log('No token in URL, redirecting to login');
          navigate('/login');
        }
      } catch (error) {
        console.error('Google auth callback error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, login, navigate]);

  return <Loader />;
}

export default GoogleCallback;
