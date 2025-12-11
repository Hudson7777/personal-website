import { Response, NextFunction } from 'express'
import { AuthRequest } from '../middleware/auth'
import { commentService } from '../services/commentService'
import { createCommentSchema, updateCommentSchema } from '../schemas/commentSchema'
import { sendSuccess, sendError } from '../utils/response'

export class CommentController {
  /**
   * 获取文章的所有评论
   * GET /api/articles/:articleId/comments
   */
  async getComments(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { articleId } = req.params

      const comments = await commentService.getCommentsByArticleId(articleId)
      sendSuccess(res, comments, 'Comments retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 创建评论
   * POST /api/articles/:articleId/comments
   */
  async createComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // Check authentication
      if (!req.user) {
        return sendError(res, 'Unauthorized', 'You must be logged in to comment', 401)
      }

      const { articleId } = req.params
      const data = createCommentSchema.parse(req.body)

      const comment = await commentService.createComment(
        articleId,
        req.user.id,
        data.content,
        data.parentId
      )

      sendSuccess(res, comment, 'Comment created successfully', 201)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 更新评论
   * PUT /api/articles/:articleId/comments/:commentId
   */
  async updateComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // Check authentication
      if (!req.user) {
        return sendError(res, 'Unauthorized', 'You must be logged in to edit comments', 401)
      }

      const { commentId } = req.params
      const data = updateCommentSchema.parse(req.body)

      const comment = await commentService.updateComment(commentId, data.content, req.user.id)

      sendSuccess(res, comment, 'Comment updated successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 删除评论
   * DELETE /api/articles/:articleId/comments/:commentId
   */
  async deleteComment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // Check authentication
      if (!req.user) {
        return sendError(res, 'Unauthorized', 'You must be logged in to delete comments', 401)
      }

      const { commentId } = req.params

      // Check if user is admin
      const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim())
      const isAdmin = adminEmails.includes(req.user.email)

      await commentService.deleteComment(commentId, req.user.id, isAdmin)

      sendSuccess(res, {}, 'Comment deleted successfully')
    } catch (error) {
      next(error)
    }
  }
}

export const commentController = new CommentController()
