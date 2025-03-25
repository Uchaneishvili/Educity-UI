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
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userData = params.get('user');

        if (token) {
          console.log('Google callback received token:', token);
          let parsedUser = null;

          if (userData) {
            try {
              parsedUser = JSON.parse(decodeURIComponent(userData));
              console.log('Parsed user data:', parsedUser);
            } catch (e) {
              console.error('Failed to parse user data:', e);
            }
          }

          const loginResult = await login({
            access_token: token,
            user: parsedUser,
          });

          if (loginResult.success) {
            console.log('Social login successful');
            navigate('/');
          } else {
            console.error('Social login failed:', loginResult.message);
            navigate('/login');
          }
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
