import { StrictMode } from 'react';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Messenger } from './components/Messenger/Messenger';

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <AppRoutes />
        <Messenger />
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
