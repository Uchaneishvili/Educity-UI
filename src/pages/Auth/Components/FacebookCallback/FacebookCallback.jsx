import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { Loader } from '../../../../components/UI/Loader/Loader';

function FacebookCallback() {
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
          // If token is directly provided in URL
          const result = {
            success: true,
            data: {
              access_token: token,
              user: userData ? JSON.parse(decodeURIComponent(userData)) : null,
            },
          };

          await login(result.data);
          navigate('/');
        } else {
          // If no token in URL, redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Facebook auth callback error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, login, navigate]);

  return <Loader />;
}

export default FacebookCallback;
