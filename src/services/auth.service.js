import axios from 'axios';
import RequestHelper from '../apis/RequestHelper';

class AuthService {
  constructor(options = {}) {
    const baseURL = process.env.REACT_APP_API_URL;
    // const baseURL = 'https://api.educity.ge/api/v1';

    const defaultOptions = {
      tokenKey: 'access_token',
      userKey: 'userData',
      loginEndpoint: '/auth/login',
      logoutEndpoint: '/auth/logout',
      currentUserEndpoint: '/auth/me',
      checkAuthEndpoint: '/auth/check',
      registerEndpoint: '/auth/register',
    };

    this.config = { ...defaultOptions, ...options };

    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this._setupInterceptors();
  }

  _setupInterceptors() {
    this.api.interceptors.request.use(
      config => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      },
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found in localStorage by AuthService');
    }
    return token;
  }

  setToken(token) {
    if (!token) {
      console.error('Attempted to set empty token');
      return;
    }

    console.log(
      'Setting token in AuthService:',
      token.substring(0, 10) + '...',
    );
    localStorage.setItem('token', token);
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeToken() {
    localStorage.removeItem('token');
    delete this.api.defaults.headers.common['Authorization'];
  }

  handleUnauthorized() {
    this.logout();
    this.redirectToLogin();
  }

  redirectToLogin() {
    window.location.href = '/login';
  }

  async login(credentials) {
    try {
      const { data } = await this.api.post(
        this.config.loginEndpoint,
        credentials,
      );

      if (data && data.access_token) {
        this.setToken(data.access_token);
        return { success: true, data };
      }

      return { success: false, message: 'Authentication failed' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Authentication failed',
      };
    }
  }

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userData');
    this.removeToken();
  }

  async getCurrentUser() {
    try {
      const { data } = await this.api.get(this.config.currentUserEndpoint);
      return data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  async checkAuth() {
    try {
      await this.api.get(this.config.checkAuthEndpoint);
      return true;
    } catch {
      return false;
    }
  }

  async register(userData) {
    try {
      const { data } = await this.api.post(
        this.config.registerEndpoint,
        userData,
      );

      if (!data.access_token) {
        console.error('No token received in register response');
        return {
          success: false,
          error: 'No authentication token received',
        };
      }

      this.setToken(data.access_token);
      if (data.refresh_token) {
        RequestHelper.setRefreshToken(data.refresh_token);
      }
      localStorage.setItem(this.config.userKey, JSON.stringify(data.user));

      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async resetPassword(passwordData) {
    try {
      const { data } = await this.api.post('/auth/reset-password', {
        password: passwordData.password,
        confirmPassword: passwordData.confirmPassword,
        token: passwordData.token,
      });
      return {
        success: true,
        data,
        message: data.message || 'Password changed successfully',
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async forgotPassword(email) {
    try {
      const { data } = await this.api.post('/auth/forgot-password', { email });
      return {
        success: true,
        data,
        message: data.message || 'Password reset email sent',
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async changePassword(passwordData) {
    try {
      const { data } = await this.api.post('/auth/change-password', {
        ...passwordData,
      });
      return {
        success: true,
        data,
        message: data.message || 'Password changed successfully',
      };
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async facebookLogin() {
    // window.location.href = `${process.env.REACT_APP_API_URL}auth/facebook`;
    window.location.href = `https://api.educity.ge/api/v1/auth/facebook`;
  }

  async googleLogin() {
    window.location.href = `https://api.educity.ge/api/v1/auth/google`;
    // window.location.href = `${process.env.REACT_APP_API_URL}auth/google`;
  }
}

export default AuthService;
