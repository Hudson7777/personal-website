import { useToastStore, Toast } from '@/stores/toast'

const typeStyles: Record<Toast['type'], string> = {
  success: 'bg-sage-50 border-sage-300 text-sage-800',
  error:   'bg-lavender-100 border-lavender-300 text-lavender-800',
  info:    'bg-mist-100 border-mist-300 text-mist-700',
}

const typeIcons: Record<Toast['type'], string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
            text-sm font-medium max-w-sm pointer-events-auto
            animate-slide-up
            ${typeStyles[toast.type]}
          `}
        >
          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-current/10">
            {typeIcons[toast.type]}
          </span>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 ml-1 opacity-50 hover:opacity-100 transition-opacity text-base leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
