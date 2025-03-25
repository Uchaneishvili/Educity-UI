import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import RequestHelper from '../apis/RequestHelper';

const AuthContext = createContext(null);
const authService = new AuthService();

// Add direct localStorage helper functions to ensure tokens are saved
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value),
    );
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const getFromLocalStorage = key => {
  try {
    const item = localStorage.getItem(key);
    return item ? (key === 'user' ? JSON.parse(item) : item) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from token if it exists
    const initializeUser = async () => {
      // First try to get token from localStorage directly
      const token = getFromLocalStorage('token');

      if (token) {
        // Make sure the token is set in the auth service too
        authService.setToken(token);

        try {
          // Try to get user from localStorage first
          const storedUser = getFromLocalStorage('user');

          if (storedUser) {
            console.log('User loaded from localStorage:', storedUser);
            setUser(storedUser);
          } else {
            // If no user in localStorage, fetch from API
            console.log('Fetching user from API with token');
            const userData = await authService.getCurrentUser();
            console.log('User data fetched:', userData);
            setUser(userData);
            saveToLocalStorage('user', userData);
          }
        } catch (error) {
          console.error('Error initializing user:', error);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          authService.logout();
        }
      } else {
        console.log('No token found in localStorage');
      }

      setLoading(false);
    };

    initializeUser();
  }, []);

  const login = async credentials => {
    console.log('Login called with:', credentials);

    // If credentials is already a result object (from social login)
    if (credentials.access_token) {
      console.log('Social login with access token');
      // Save token to localStorage directly
      saveToLocalStorage('token', credentials.access_token);
      authService.setToken(credentials.access_token);

      if (credentials.refresh_token) {
        saveToLocalStorage('refreshToken', credentials.refresh_token);
        RequestHelper.setRefreshToken(credentials.refresh_token);
      }

      // If user data is provided directly
      if (credentials.user) {
        console.log('User data provided directly:', credentials.user);
        setUser(credentials.user);
        saveToLocalStorage('user', credentials.user);
        return { success: true };
      } else {
        // Otherwise fetch user data
        console.log('Fetching user data with token');
        const userData = await authService.getCurrentUser();
        console.log('User data fetched:', userData);
        setUser(userData);
        saveToLocalStorage('user', userData);
        return { success: true };
      }
    }

    // Regular login with credentials
    console.log('Regular login with credentials');
    const result = await authService.login(credentials);
    console.log('Login result:', result);

    if (result.success) {
      // Make sure the token is saved to localStorage
      if (result.data && result.data.access_token) {
        saveToLocalStorage('token', result.data.access_token);
      }

      const userData = await authService.getCurrentUser();
      console.log('User data after login:', userData);
      setUser(userData);
      saveToLocalStorage('user', userData);
    }
    return result;
  };

  const logout = () => {
    console.log('Logging out, clearing storage');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    authService.logout();
    setUser(null);
  };

  const updateUser = userData => {
    setUser(userData);
    saveToLocalStorage('user', userData);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!getFromLocalStorage('token'),
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
