import { Response, NextFunction } from 'express'
import prisma from '../lib/prisma'
import { sendSuccess, sendPaginated } from '../utils/response'
import { AuthRequest } from '../middleware/auth'

/**
 * Admin Controller — admin-only operations
 */
export class AdminController {
  /**
   * GET /api/admin/comments
   * Returns all comments across all articles (paginated)
   */
  async getAllComments(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const page  = parseInt(req.query.page  as string) || 1
      const limit = parseInt(req.query.limit as string) || 20
      const skip  = (page - 1) * limit

      const [comments, total] = await Promise.all([
        prisma.comment.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          where: { parentId: null }, // top-level only for admin view
          include: {
            author: { select: { id: true, name: true, email: true, avatar: true } },
            article: { select: { id: true, title: true, category: true } },
            replies: {
              include: {
                author: { select: { id: true, name: true, avatar: true } },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
        }),
        prisma.comment.count({ where: { parentId: null } }),
      ])

      sendPaginated(res, comments, total, page, limit, 'Comments retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * DELETE /api/admin/comments/:id
   * Admin can delete any comment (and its replies via cascade)
   */
  async deleteComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await prisma.comment.delete({ where: { id } })
      sendSuccess(res, null, 'Comment deleted successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /api/admin/stats
   * Dashboard stats: articles, comments, categories
   */
  async getStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const [articleCount, commentCount, categoryCount] = await Promise.all([
        prisma.article.count(),
        prisma.comment.count(),
        prisma.category.count(),
      ])

      sendSuccess(res, { articleCount, commentCount, categoryCount }, 'Stats retrieved')
    } catch (error) {
      next(error)
    }
  }
}

export const adminController = new AdminController()
