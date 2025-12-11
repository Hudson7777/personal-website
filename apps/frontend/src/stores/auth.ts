import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setAccessToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  refreshAccessToken: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isLoading: false,
  error: null,
  isAdmin: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      
      set({ 
        user: data.user, 
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAdmin: true,
      })
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    set({ user: null, accessToken: null, refreshToken: null, isAdmin: false })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },

  setUser: (user) => set({ user }),
  
  setAccessToken: (token) => {
    set({ accessToken: token })
    if (token) {
      localStorage.setItem('accessToken', token)
    } else {
      localStorage.removeItem('accessToken')
    }
  },

  setRefreshToken: (token) => {
    set({ refreshToken: token })
    if (token) {
      localStorage.setItem('refreshToken', token)
    } else {
      localStorage.removeItem('refreshToken')
    }
  },

  refreshAccessToken: async () => {
    const refreshToken = get().refreshToken
    if (!refreshToken) {
      get().logout()
      return
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      
      get().setAccessToken(data.accessToken)
    } catch (error) {
      console.error('Failed to refresh token:', error)
      get().logout()
    }
  },
}))
