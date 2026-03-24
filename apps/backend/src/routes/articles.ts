import { Router } from 'express'
import { articleController } from '../controllers/articleController'
import { authMiddleware, adminMiddleware } from '../middleware/auth'
import commentsRouter from './comments'

const router = Router()

// Public reads
router.get('/',          articleController.getArticles.bind(articleController))
router.get('/:id/related', articleController.getRelatedArticles.bind(articleController))
router.get('/:id',       articleController.getArticleById.bind(articleController))

// Comments (has its own auth per operation)
router.use('/:articleId/comments', commentsRouter)

// Protected writes — require admin auth
router.post('/',    authMiddleware, adminMiddleware, articleController.createArticle.bind(articleController))
router.put('/:id',  authMiddleware, adminMiddleware, articleController.updateArticle.bind(articleController))
router.delete('/:id', authMiddleware, adminMiddleware, articleController.deleteArticle.bind(articleController))

export default router
