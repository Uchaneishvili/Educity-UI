import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Messenger } from './components/Messenger/Messenger';
import GTMHelper from './utils/GTMHelper';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Track page views when the route changes
    GTMHelper.pageView(location.pathname + location.search);
  }, [location]);

  return (
    <AuthProvider>
      <AppRoutes />
      <Messenger />
    </AuthProvider>
  );
}

export default App;
