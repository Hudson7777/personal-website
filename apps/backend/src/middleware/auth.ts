import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { sendError } from '../utils/response'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return sendError(res, 'Unauthorized', 'No token provided', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = decoded as any
    return next()
  } catch (error) {
    return sendError(res, 'Unauthorized', 'Invalid token', 401)
  }
}

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 'No token provided', 401)
  }

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(email => email.trim())
  if (!adminEmails.includes(req.user.email)) {
    return sendError(res, 'Forbidden', 'Admin access required', 403)
  }

  return next()
}
