import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { trackPageView } from './utils/ClarityTracking';
import { useAuth } from './context/AuthContext';
import AuthService from './services/auth.service';
import RequestHelper from './apis/RequestHelper';

function App() {
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
          // ... processes the token and logs in the user
        } catch (error) {
          console.error('Auth token handling error:', error);
        }
      }
    };

    handleAuthToken();
  }, [login]);
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
