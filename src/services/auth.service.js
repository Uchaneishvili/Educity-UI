import axios from "axios";

class AuthService {
  constructor(options = {}) {
    const baseURL = process.env.REACT_APP_API_URL;

    const defaultOptions = {
      tokenKey: "authToken",
      userKey: "userData",
      loginEndpoint: "/auth/login",
      logoutEndpoint: "/auth/logout",
      currentUserEndpoint: "/auth/me",
      checkAuthEndpoint: "/auth/check",
    };

    this.config = { ...defaultOptions, ...options };

    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this._setupInterceptors();
  }

  _setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  getToken() {
    return localStorage.getItem(this.config.tokenKey);
  }

  setToken(token) {
    localStorage.setItem(this.config.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.config.tokenKey);
  }

  handleUnauthorized() {
    this.logout();
    this.redirectToLogin();
  }

  redirectToLogin() {
    window.location.href = "/login";
  }

  async login(credentials) {
    try {
      const { data } = await this.api.post(
        this.config.loginEndpoint,
        credentials
      );

      this.setToken(data.token);
      localStorage.setItem(this.config.userKey, JSON.stringify(data.user));

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async logout() {
    // Remove token and user data from local storage
    this.removeToken();
    localStorage.removeItem(this.config.userKey);
    // this.redirectToLogin() // Redirect to login page
  }

  async getCurrentUser() {
    try {
      const { data } = await this.api.get(this.config.currentUserEndpoint);
      return data.user;
    } catch (error) {
      console.error("Error fetching current user:", error);
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
}

export default AuthService;
