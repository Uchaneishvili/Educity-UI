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

        console.log('Google callback running, URL params:', location.search);
        console.log('Token found in URL:', token);

        if (token) {
          // Store token directly in localStorage first
          localStorage.setItem('token', token);
          console.log('Token saved to localStorage');

          let parsedUser = null;
          if (userData) {
            try {
              parsedUser = JSON.parse(decodeURIComponent(userData));
              console.log('Parsed user data:', parsedUser);
              // Store user data as well
              localStorage.setItem('user', JSON.stringify(parsedUser));
            } catch (e) {
              console.error('Failed to parse user data:', e);
            }
          }

          // Now call login with the token
          const loginResult = await login({
            access_token: token,
            user: parsedUser,
          });

          if (loginResult && loginResult.success) {
            console.log('Social login successful');
            navigate('/');
          } else {
            console.error('Social login failed:', loginResult?.message);
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
