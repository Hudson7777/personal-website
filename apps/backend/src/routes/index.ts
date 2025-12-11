import { Router } from 'express'

const router = Router()

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Auth routes (placeholder)
router.post('/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint' })
})

router.post('/auth/register', (req, res) => {
  res.json({ message: 'Register endpoint' })
})

router.post('/auth/refresh', (req, res) => {
  res.json({ message: 'Refresh token endpoint' })
})

// Articles routes (placeholder)
router.get('/articles', (req, res) => {
  res.json({ message: 'Get articles' })
})

router.post('/articles', (req, res) => {
  res.json({ message: 'Create article' })
})

export default router
