import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Messenger } from './components/Messenger/Messenger';
import { useEffect } from 'react';
import RequestHelper from './apis/RequestHelper';

function AppContent() {
  useEffect(() => {
    const handleTokenInUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const refreshToken = params.get('refreshToken');

      if (token) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );

        RequestHelper.resetAxiosInstances();
        window.location.reload();
      }
    };

    handleTokenInUrl();
  }, []);

  return (
    <>
      <AppRoutes />
      <Messenger />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
