import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { trackPageView } from './utils/ClarityTracking';
import { useAuth } from './context/AuthContext';
import AuthService from './services/auth.service';
import RequestHelper from './apis/RequestHelper';

function AppContent() {
  const location = useLocation();
  const { login } = useAuth();
  const authService = new AuthService();

  // Handle auth tokens in URL
  useEffect(() => {
    const handleAuthToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const userData = params.get('user');

      // Only handle tokens on paths other than the callback paths
      const path = window.location.pathname;
      if (!path.includes('/callback') && token) {
        try {
          console.log('App.jsx handling token from URL');

          // Clear the URL without refreshing the page
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );

          // Save token directly to localStorage
          localStorage.setItem('token', token);

          // Process the token
          const parsedUser = userData
            ? JSON.parse(decodeURIComponent(userData))
            : null;
          if (parsedUser) {
            localStorage.setItem('user', JSON.stringify(parsedUser));
          }

          const result = {
            success: true,
            data: {
              access_token: token,
              user: parsedUser,
            },
          };

          await login(result.data);
        } catch (error) {
          console.error('Auth token handling error:', error);
        }
      }
    };

    handleAuthToken();
  }, [login]);

  // Track page views when route changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return <AppRoutes />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
