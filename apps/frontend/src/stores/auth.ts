import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

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
      set({ user: data.user, token: data.token })
      localStorage.setItem('token', data.token)
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem('token')
  },

  setUser: (user) => set({ user }),
  setToken: (token) => {
    set({ token })
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
}))
