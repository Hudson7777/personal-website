import { Router } from 'express'
import { authMiddleware } from '../middleware/auth'
import { commentController } from '../controllers/commentController'

const router = Router({ mergeParams: true })

/**
 * 评论路由
 * 基础路径: /api/articles/:articleId/comments
 */

// 获取评论列表（不需要认证）
router.get('/', commentController.getComments.bind(commentController))

// 创建评论（需要认证）
router.post('/', authMiddleware, commentController.createComment.bind(commentController))

// 更新评论（需要认证）
router.put('/:commentId', authMiddleware, commentController.updateComment.bind(commentController))

// 删除评论（需要认证）
router.delete('/:commentId', authMiddleware, commentController.deleteComment.bind(commentController))

export default router
