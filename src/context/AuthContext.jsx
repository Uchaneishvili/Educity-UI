import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import RequestHelper from '../apis/RequestHelper';

const AuthContext = createContext(null);
const authService = new AuthService();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from token if it exists
    const initializeUser = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          // Try to load user from local storage first
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (parseError) {
              console.error('Error parsing stored user data:', parseError);
              // If parsing fails, fetch from API
              const userData = await authService.getCurrentUser();
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData || {}));
            }
          } else {
            // If no stored user, fetch from API
            const userData = await authService.getCurrentUser();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData || {}));
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          localStorage.removeItem('user');
          authService.logout(); // Clear invalid token
        }
      }
      setLoading(false);
    };
    initializeUser();
  }, []);

  const login = async credentials => {
    // If credentials is already a result object (from social login)
    if (credentials.access_token) {
      authService.setToken(credentials.access_token);
      // Also store user data in local storage
      localStorage.setItem('user', JSON.stringify(credentials.user || {}));

      if (credentials.refresh_token) {
        RequestHelper.setRefreshToken(credentials.refresh_token);
      }

      // If user data is provided directly
      if (credentials.user) {
        setUser(credentials.user);
        return { success: true };
      } else {
        // Otherwise fetch user data
        const userData = await authService.getCurrentUser();
        setUser(userData);
        // Store fetched user data in local storage
        localStorage.setItem('user', JSON.stringify(userData || {}));
        return { success: true };
      }
    }

    // Regular login with credentials
    const result = await authService.login(credentials);
    if (result.success) {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      // Store user data in local storage after regular login
      localStorage.setItem('user', JSON.stringify(userData || {}));
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    // Clear user data from local storage on logout
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = userData => {
    setUser(userData);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!authService.getToken(),
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
