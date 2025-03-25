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

    // Special case for social login where we already have a token
    if (credentials.access_token) {
      console.log('Processing social login with token');
      authService.setToken(credentials.access_token);

      if (credentials.refresh_token) {
        localStorage.setItem('refreshToken', credentials.refresh_token);
      }

      // If user data is provided directly with the token
      if (credentials.user) {
        console.log('Using provided user data:', credentials.user);
        setUser(credentials.user);
        localStorage.setItem('user', JSON.stringify(credentials.user));
        return { success: true };
      } else {
        // Fetch user info with the token
        try {
          console.log('Fetching user data with token');
          const userData = await authService.getCurrentUser();
          console.log('User data fetched:', userData);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          return { success: true };
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          return { success: false, message: 'Failed to fetch user data' };
        }
      }
    }

    // Regular username/password login
    console.log('Performing regular login');
    const result = await authService.login(credentials);
    console.log('Login result:', result);

    if (result.success) {
      try {
        const userData = await authService.getCurrentUser();
        console.log('User data after login:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Failed to fetch user after login:', error);
      }
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
