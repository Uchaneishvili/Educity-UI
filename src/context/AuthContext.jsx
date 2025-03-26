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
    return item ? (key === 'userData' ? JSON.parse(item) : item) : null;
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
      const token = getFromLocalStorage('access_token');

      if (token) {
        // Make sure the token is set in the auth service too
        authService.setToken(token);

        try {
          // Try to get user from localStorage first
          const storedUser = getFromLocalStorage('userData');

          if (storedUser) {
            console.log('User loaded from localStorage:', storedUser);
            setUser(storedUser);
          } else {
            // If no user in localStorage, fetch from API
            console.log('Fetching user from API with token');
            console.log('token', token);
            const userData = await authService.getCurrentUser();
            console.log('User data fetched:', userData);
            setUser(userData);
            saveToLocalStorage('userData', userData);
          }
        } catch (error) {
          console.error('Error initializing user:', error);
          // Clear invalid data
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('userData');
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
    // If we have an access_token, it's a social login
    if (credentials.access_token) {
      try {
        console.log('credentials', credentials);
        // Store the token
        localStorage.setItem('access_token', credentials.access_token);

        // Set up axios with the new token
        authService.setToken(credentials.access_token);

        // Fetch user data using the token
        const userData = await authService.getCurrentUser();

        // Store user data
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));

        return { success: true };
      } catch (error) {
        console.error('Social login error:', error);
        return { success: false, error: 'Failed to process social login' };
      }
    }

    const result = await authService.login(credentials);
    console.log('result', result);

    if (result.success) {
      try {
        const userData = await authService.getCurrentUser();
        console.log('User data after login:', userData);
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error('Failed to fetch user after login:', error);
      }
    }

    return result;
  };

  const logout = () => {
    console.log('Logging out, clearing storage');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userData');
    authService.logout();
    setUser(null);
  };

  const updateUser = userData => {
    setUser(userData);
    saveToLocalStorage('userData', userData);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!getFromLocalStorage('access_token'),
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
