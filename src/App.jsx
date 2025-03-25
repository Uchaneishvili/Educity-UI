import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { trackPageView } from './utils/ClarityTracking';

function App() {
  const location = useLocation();

  // Track page views when route changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
