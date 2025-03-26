import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Messenger } from './components/Messenger/Messenger';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { login } = useAuth();

  useEffect(() => {
    const handleAuthToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        try {
          // Clear the URL without refreshing the page
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );

          // Login with the token
          await login({
            access_token: token,
          });
        } catch (error) {
          console.error('Auth token handling error:', error);
        }
      }
    };

    handleAuthToken();
  }, [login]);

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
