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

      if (token) {
        localStorage.setItem('access_token', token);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );

        RequestHelper.resetAxiosInstances();
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
