export const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, data }
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async logout() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include' // Important for cookies
      })

      if (response.ok) {
        window.location.href = '/login' // Force a page refresh to clear any state
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  },

  async getCurrentUser() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
        credentials: 'include' // Important for cookies
      })

      if (response.ok) {
        const data = await response.json()
        return data.user
      }
      return null
    } catch (error) {
      console.error('Error fetching current user:', error)
      return null
    }
  },

  async checkAuth() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/check`, {
        credentials: 'include' // Important for cookies
      })
      return response.ok
    } catch {
      return false
    }
  }
}
