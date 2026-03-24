import { Request, Response, NextFunction } from 'express'
import bcryptjs from 'bcryptjs'
import prisma from '../lib/prisma'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { sendSuccess, sendError } from '../utils/response'
import { AuthRequest } from '../middleware/auth'

export class AuthController {
  /**
   * 管理员登录
   * POST /api/auth/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      // Validate input
      if (!email || !password) {
        return sendError(res, 'Validation Error', 'Email and password are required', 400)
      }

      // Check if email is in admin list
      const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim())
      if (!adminEmails.includes(email)) {
        return sendError(res, 'Unauthorized', 'Invalid credentials', 401)
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return sendError(res, 'Unauthorized', 'Invalid credentials', 401)
      }

      // Verify password
      const isPasswordValid = await bcryptjs.compare(password, user.password)
      if (!isPasswordValid) {
        return sendError(res, 'Unauthorized', 'Invalid credentials', 401)
      }

      // Generate tokens
      const accessToken = generateAccessToken({ id: user.id, email: user.email })
      const refreshToken = generateRefreshToken({ id: user.id, email: user.email })

      // Return tokens
      sendSuccess(
        res,
        {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          accessToken,
          refreshToken,
        },
        'Login successful',
        200
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * 刷新 Token
   * POST /api/auth/refresh
   */
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return sendError(res, 'Validation Error', 'Refresh token is required', 400)
      }

      // Verify refresh token
      const payload = verifyRefreshToken(refreshToken)
      if (!payload) {
        return sendError(res, 'Unauthorized', 'Invalid refresh token', 401)
      }

      // Generate new access token
      const accessToken = generateAccessToken(payload)

      sendSuccess(
        res,
        {
          accessToken,
        },
        'Token refreshed successfully',
        200
      )
    } catch (error) {
      next(error)
    }
  }

  /**
   * 登出（可选）
   * POST /api/auth/logout
   */
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      sendSuccess(res, {}, 'Logout successful', 200)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 获取当前用户资料
   * GET /api/auth/me
   */
  async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id
      if (!userId) return sendError(res, 'Unauthorized', 'Not authenticated', 401)

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, bio: true, avatar: true, createdAt: true },
      })

      if (!user) return sendError(res, 'Not Found', 'User not found', 404)
      sendSuccess(res, user, 'Profile retrieved')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 更新当前用户资料
   * PUT /api/auth/profile
   */
  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id
      if (!userId) return sendError(res, 'Unauthorized', 'Not authenticated', 401)

      const { name, bio, avatar } = req.body

      const updated = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(name  !== undefined && { name }),
          ...(bio   !== undefined && { bio }),
          ...(avatar !== undefined && { avatar }),
        },
        select: { id: true, email: true, name: true, bio: true, avatar: true },
      })

      sendSuccess(res, updated, 'Profile updated')
    } catch (error) {
      next(error)
    }
  }
}

export const authController = new AuthController()
