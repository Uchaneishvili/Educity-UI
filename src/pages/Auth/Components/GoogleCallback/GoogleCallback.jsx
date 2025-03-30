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
        const refreshToken = params.get('refreshToken');

        console.log('params', params);

        console.log('refreshToken', refreshToken);
        if (token) {
          // Store token directly in localStorage first
          localStorage.setItem('access_token', token);
          localStorage.setItem('refresh_token', refreshToken);
          const result = {
            success: true,
            data: {
              access_token: token,
              refresh_token: refreshToken,
            },
          };

          await login(result.data);
          navigate('/');
        } else {
          console.warn('No token found in URL params');
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
