import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { sendError } from './utils/response'
import { AppError } from './utils/errors'
import articlesRouter from './routes/articles'
import authRouter from './routes/auth'
import categoriesRouter from './routes/categories'
import tagsRouter from './routes/tags'
import uploadRouter from './routes/upload'
import seoRouter from './routes/seo'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`)
  })
  next()
})

// Static files serving
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')))
app.use(express.static(path.join(process.cwd(), 'public')))

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/upload', uploadRouter)
app.use('/', seoRouter)

// 404 handler
app.use((req: Request, res: Response) => {
  sendError(res, 'Not Found', `Route ${req.path} not found`, 404)
})

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]', err)

  // Handle Prisma errors
  if (err.code === 'P2025') {
    return sendError(res, 'Not Found', 'Resource not found', 404)
  }

  if (err.code === 'P2002') {
    return sendError(res, 'Conflict', 'Unique constraint violation', 409)
  }

  // Handle custom AppError
  if (err instanceof AppError) {
    return sendError(res, err.error || err.name, err.message, err.statusCode)
  }

  // Handle validation errors
  if (err.name === 'ZodError') {
    const message = err.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ')
    return sendError(res, 'Validation Error', message, 400)
  }

  // Default error
  sendError(res, 'Internal Server Error', err.message || 'An unexpected error occurred', 500)
})

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n📛 Shutting down gracefully...')
  server.close(async () => {
    await prisma.$disconnect()
    console.log('✅ Server closed')
    process.exit(0)
  })
})

process.on('SIGTERM', async () => {
  console.log('\n📛 Shutting down gracefully...')
  server.close(async () => {
    await prisma.$disconnect()
    console.log('✅ Server closed')
    process.exit(0)
  })
})

export { app, prisma }
