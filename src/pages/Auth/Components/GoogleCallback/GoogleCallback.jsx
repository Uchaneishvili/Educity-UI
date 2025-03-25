import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { Loader } from '../../../../components/UI/Loader/Loader';
import GTMHelper from '../../../../utils/GTMHelper';

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
          // If token is directly provided in URL
          const result = {
            success: true,
            data: {
              access_token: token,
              user: userData ? JSON.parse(decodeURIComponent(userData)) : null,
            },
          };

          await login(result.data);
          GTMHelper.event('login_success', {
            method: 'google',
            user_id: result.data.user?.id,
          });
          navigate('/');
        } else {
          // If no token in URL, redirect to login
          GTMHelper.event('login_failed', { method: 'google' });
          navigate('/login');
        }
      } catch (error) {
        console.error('Google auth callback error:', error);
        GTMHelper.event('login_error', {
          method: 'google',
          error_message: error.message,
        });
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, login, navigate]);

  return <Loader />;
}

export default GoogleCallback;
