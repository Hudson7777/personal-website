import { Link } from 'react-router-dom'
import Container from '@/components/Container'

export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
        <div className="text-8xl font-bold text-accent/20 mb-4 font-serif">404</div>
        <h1 className="text-3xl font-semibold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          ← Back to Home
        </Link>
      </div>
    </Container>
  )
}
