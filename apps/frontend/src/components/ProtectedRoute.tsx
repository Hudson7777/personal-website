import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessToken, isAdmin } = useAuthStore()

  // If no token or not admin, redirect to login
  if (!accessToken || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
