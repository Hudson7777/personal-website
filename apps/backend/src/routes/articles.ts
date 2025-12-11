import { Router } from 'express'
import { articleController } from '../controllers/articleController'

const router = Router()

/**
 * 文章路由
 */

// 获取文章列表
router.get('/', articleController.getArticles.bind(articleController))

// 获取相关文章
router.get('/:id/related', articleController.getRelatedArticles.bind(articleController))

// 获取单篇文章
router.get('/:id', articleController.getArticleById.bind(articleController))

// 创建文章
router.post('/', articleController.createArticle.bind(articleController))

// 更新文章
router.put('/:id', articleController.updateArticle.bind(articleController))

// 删除文章
router.delete('/:id', articleController.deleteArticle.bind(articleController))

export default router
