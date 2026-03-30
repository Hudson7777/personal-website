import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
}

const MAX_TOASTS = 3
let counter = 0

interface ToastStore {
  toasts: Toast[]
  timers: Map<string, ReturnType<typeof setTimeout>>
  addToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  timers: new Map(),
  addToast: (message, type, duration = 3500) => {
    const id = `toast-${Date.now()}-${++counter}`
    set((state) => {
      const toasts = [...state.toasts, { id, message, type, duration }]
      // Evict oldest toasts if over the cap
      const evicted = toasts.slice(0, Math.max(0, toasts.length - MAX_TOASTS))
      evicted.forEach((t) => {
        clearTimeout(state.timers.get(t.id))
        state.timers.delete(t.id)
      })
      return { toasts: toasts.slice(-MAX_TOASTS) }
    })
    const timer = setTimeout(() => {
      get().removeToast(id)
    }, duration)
    get().timers.set(id, timer)
  },
  removeToast: (id) => {
    const timer = get().timers.get(id)
    if (timer) {
      clearTimeout(timer)
      get().timers.delete(id)
    }
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))
