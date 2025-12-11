import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import { cn } from '@/lib/utils'

export default function AdminLayout() {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/articles', label: 'Articles' },
    { path: '/admin/comments', label: 'Comments' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-foreground hover:text-accent transition-colors">
            Personal
          </Link>
          <p className="text-xs text-muted-foreground mt-2">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block px-4 py-2 rounded-lg transition-colors duration-base',
                isActive(item.path)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4 w-64">
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
