import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { Messenger } from './components/Messenger/Messenger';
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Messenger />
    </AuthProvider>
  );
}

export default App;
