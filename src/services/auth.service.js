import axios from 'axios'
import RequestHelper from '../apis/RequestHelper'

class AuthService {
  constructor(options = {}) {
    const baseURL = process.env.REACT_APP_API_URL

    const defaultOptions = {
      tokenKey: 'access_token',
      userKey: 'userData',
      loginEndpoint: '/auth/login',
      logoutEndpoint: '/auth/logout',
      currentUserEndpoint: '/auth/me',
      checkAuthEndpoint: '/auth/check',
      registerEndpoint: '/auth/register'
    }

    this.config = { ...defaultOptions, ...options }

    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this._setupInterceptors()
  }

  _setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        return Promise.reject(error)
      }
    )
  }

  getToken() {
    const token = localStorage.getItem(this.config.tokenKey)
    return token
  }

  setToken(token) {
    if (!token) {
      console.warn('Attempting to set null/undefined token')
      return
    }
    localStorage.setItem(this.config.tokenKey, token)
  }

  removeToken() {
    localStorage.removeItem(this.config.tokenKey)
  }

  handleUnauthorized() {
    this.logout()
    this.redirectToLogin()
  }

  redirectToLogin() {
    window.location.href = '/login'
  }

  async login(credentials) {
    try {
      const { data } = await this.api.post(this.config.loginEndpoint, credentials)

      if (!data.access_token) {
        console.error('No token received in login response')
        return {
          success: false,
          error: 'No authentication token received'
        }
      }

      this.setToken(data.access_token)
      if (data.refresh_token) {
        RequestHelper.setRefreshToken(data.refresh_token)
      }
      localStorage.setItem(this.config.userKey, JSON.stringify(data.user))

      return { success: true, data }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message
      }
    }
  }

  async logout() {
    this.removeToken()
    localStorage.removeItem(this.config.userKey)
  }

  async getCurrentUser() {
    try {
      const { data } = await this.api.get(this.config.currentUserEndpoint)
      return data
    } catch (error) {
      console.error('Error fetching current user:', error)
      return null
    }
  }

  async checkAuth() {
    try {
      await this.api.get(this.config.checkAuthEndpoint)
      return true
    } catch {
      return false
    }
  }

  async register(userData) {
    try {
      const { data } = await this.api.post(this.config.registerEndpoint, userData)

      if (!data.access_token) {
        console.error('No token received in register response')
        return {
          success: false,
          error: 'No authentication token received'
        }
      }

      this.setToken(data.access_token)
      if (data.refresh_token) {
        RequestHelper.setRefreshToken(data.refresh_token)
      }
      localStorage.setItem(this.config.userKey, JSON.stringify(data.user))

      return { success: true, data }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message
      }
    }
  }
}

export default AuthService
