import axios from 'axios';
import AuthService from '../services/auth.service';

const authService = new AuthService();

export default class RequestHelper {
  static EDUCITY_BASE_URL = process.env.REACT_APP_API_URL;
  // static EDUCITY_BASE_URL = 'http://18.199.174.218/api/v1';
  static _educity = null;

  static resetAxiosInstances() {
    this._educity = null;
  }

  static get educity() {
    if (!this._educity) {
      this._educity = axios.create({
        baseURL: this.EDUCITY_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getAuthorization(),
          'Timezone-Offset': new Date().getTimezoneOffset(),
        },
      });
      this.setInterceptor(this._educity);
    }
    return this._educity;
  }

  static getAuthorization() {
    return `Bearer ${authService.getToken()}`;
  }

  static setInterceptor(instance, catchResponse = true) {
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
      failedQueue.forEach(prom => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      failedQueue = [];
    };

    instance.interceptors.request.use(
      async request => {
        const currentToken = authService.getToken();
        request.headers.Authorization = `Bearer ${currentToken}`;
        return request;
      },
      error => Promise.reject(error),
    );

    if (catchResponse) {
      instance.interceptors.response.use(
        response => response,
        async error => {
          const originalRequest = error.config;

          if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then(token => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  return instance(originalRequest);
                })
                .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
              const newToken = await this.refreshAccessToken();
              processQueue(null, newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return instance(originalRequest);
            } catch (refreshError) {
              processQueue(refreshError, null);
              authService.logout();
              window.location.href = '/login';
              return Promise.reject(refreshError);
            } finally {
              isRefreshing = false;
            }
          }

          return Promise.reject(error);
        },
      );
    }
  }

  static getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  static setRefreshToken(token) {
    if (token) {
      localStorage.setItem('refresh_token', token);
    }
  }

  static async refreshAccessToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(
        `${this.EDUCITY_BASE_URL}/auth/refresh-token`,
        {
          refresh_token: refreshToken,
        },
      );

      if (response.data?.access_token) {
        authService.setToken(response.data.access_token);
        if (response.data.refresh_token) {
          this.setRefreshToken(response.data.refresh_token);
        }
        localStorage.setItem(
          'lastTokenRefreshTime',
          new Date().getTime().toString(),
        );
        return response.data.access_token;
      }
      throw new Error('No access token received');
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}
