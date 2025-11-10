import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref(null)
  const lastActivity = ref(null)

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      isLoggedIn.value = true
      user.value = { username: 'admin', role: 'admin' }
      lastActivity.value = Date.now()
      localStorage.setItem('auth', JSON.stringify({ 
        isLoggedIn: true, 
        user: user.value,
        lastActivity: lastActivity.value
      }))
      startInactivityTimer()
      return true
    }
    return false
  }

  const logout = () => {
    isLoggedIn.value = false
    user.value = null
    lastActivity.value = null
    localStorage.removeItem('auth')
    clearInactivityTimer()
  }

  const checkAuth = () => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const auth = JSON.parse(savedAuth)
      // Check if session is still valid (8 hours)
      const eightHours = 8 * 60 * 60 * 1000
      if (Date.now() - auth.lastActivity < eightHours) {
        isLoggedIn.value = auth.isLoggedIn
        user.value = auth.user
        lastActivity.value = auth.lastActivity
        startInactivityTimer()
      } else {
        logout()
      }
    }
  }

  const updateActivity = () => {
    if (isLoggedIn.value) {
      lastActivity.value = Date.now()
      localStorage.setItem('auth', JSON.stringify({ 
        isLoggedIn: true, 
        user: user.value,
        lastActivity: lastActivity.value
      }))
    }
  }

  let inactivityTimer
  const startInactivityTimer = () => {
    // Auto logout after 30 minutes of inactivity
    clearInactivityTimer()
    inactivityTimer = setInterval(() => {
      const thirtyMinutes = 30 * 60 * 1000
      if (lastActivity.value && Date.now() - lastActivity.value > thirtyMinutes) {
        logout()
        window.location.reload()
      }
    }, 60000) // Check every minute
  }

  const clearInactivityTimer = () => {
    if (inactivityTimer) {
      clearInterval(inactivityTimer)
    }
  }

  // Track user activity
  if (typeof window !== 'undefined') {
    ['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })
  }

  return {
    isLoggedIn,
    user,
    login,
    logout,
    checkAuth
  }
}, {
  persist: {
    key: 'cafe-auth',
    storage: localStorage
  }
})