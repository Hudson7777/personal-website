import { Request, Response, NextFunction } from 'express'
import { tagService } from '../services/tagService'
import { createTagSchema, updateTagSchema } from '../schemas/tagSchema'
import { sendSuccess, sendError } from '../utils/response'

/**
 * 标签控制器
 */
export class TagController {
  /**
   * 获取所有标签
   * GET /api/tags
   */
  async getTags(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await tagService.getTags()
      sendSuccess(res, tags, 'Tags retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 获取单个标签
   * GET /api/tags/:id
   */
  async getTagById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const tag = await tagService.getTagById(id)
      sendSuccess(res, tag, 'Tag retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 创建标签
   * POST /api/tags
   */
  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createTagSchema.parse(req.body)
      const tag = await tagService.createTag(data)
      sendSuccess(res, tag, 'Tag created successfully', 201)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 更新标签
   * PUT /api/tags/:id
   */
  async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = updateTagSchema.parse(req.body)
      const tag = await tagService.updateTag(id, data)
      sendSuccess(res, tag, 'Tag updated successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 删除标签
   * DELETE /api/tags/:id
   */
  async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await tagService.deleteTag(id)
      sendSuccess(res, null, 'Tag deleted successfully')
    } catch (error) {
      next(error)
    }
  }
}

export const tagController = new TagController()
