import { Request, Response, NextFunction } from 'express'
import { articleService } from '../services/articleService'
import { createArticleSchema, updateArticleSchema, queryArticlesSchema } from '../schemas/articleSchema'
import { sendSuccess, sendPaginated, sendError } from '../utils/response'
import { ValidationError, NotFoundError } from '../utils/errors'

/**
 * 文章控制器
 */
export class ArticleController {
  /**
   * 获取文章列表
   * GET /api/articles
   */
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const query = queryArticlesSchema.parse(req.query)
      const { articles, total, page, limit } = await articleService.getArticles(query)

      sendPaginated(res, articles, total, page, limit, 'Articles retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 获取单篇文章
   * GET /api/articles/:id
   */
  async getArticleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const article = await articleService.getArticleById(id)
      sendSuccess(res, article, 'Article retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 创建文章
   * POST /api/articles
   */
  async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      // 验证请求数据
      const data = createArticleSchema.parse(req.body)

      // 这里应该从 JWT token 中获取 authorId，暂时使用硬编码
      // TODO: 实现认证中间件
      const authorId = req.body.authorId || 'default-user-id'

      const article = await articleService.createArticle(data, authorId)
      sendSuccess(res, article, 'Article created successfully', 201)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 更新文章
   * PUT /api/articles/:id
   */
  async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = updateArticleSchema.parse(req.body)

      const article = await articleService.updateArticle(id, data)
      sendSuccess(res, article, 'Article updated successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 删除文章
   * DELETE /api/articles/:id
   */
  async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await articleService.deleteArticle(id)
      sendSuccess(res, null, 'Article deleted successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 获取相关文章
   * GET /api/articles/:id/related
   */
  async getRelatedArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3

      const articles = await articleService.getRelatedArticles(id, limit)
      sendSuccess(res, articles, 'Related articles retrieved successfully')
    } catch (error) {
      next(error)
    }
  }
}

export const articleController = new ArticleController()
