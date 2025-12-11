import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Section from '@/components/Section'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }

    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Section padding="lg">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="card-base p-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Admin Login</h1>
              <p className="text-muted-foreground text-center mb-8">
                Sign in to access the admin dashboard
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={isLoading}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={isLoading}
                  />
                </div>

                {/* Error Message */}
                {(error || localError) && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                    {error || localError}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Only authorized administrators can access this area
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
