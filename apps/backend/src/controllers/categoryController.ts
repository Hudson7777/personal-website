import { Request, Response, NextFunction } from 'express'
import { categoryService } from '../services/categoryService'
import { createCategorySchema, updateCategorySchema } from '../schemas/categorySchema'
import { sendSuccess, sendError } from '../utils/response'

/**
 * 分类控制器
 */
export class CategoryController {
  /**
   * 获取所有分类
   * GET /api/categories
   */
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getCategories()
      sendSuccess(res, categories, 'Categories retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 获取单个分类
   * GET /api/categories/:id
   */
  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const category = await categoryService.getCategoryById(id)
      sendSuccess(res, category, 'Category retrieved successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 创建分类
   * POST /api/categories
   */
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createCategorySchema.parse(req.body)
      const category = await categoryService.createCategory(data)
      sendSuccess(res, category, 'Category created successfully', 201)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 更新分类
   * PUT /api/categories/:id
   */
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = updateCategorySchema.parse(req.body)
      const category = await categoryService.updateCategory(id, data)
      sendSuccess(res, category, 'Category updated successfully')
    } catch (error) {
      next(error)
    }
  }

  /**
   * 删除分类
   * DELETE /api/categories/:id
   */
  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await categoryService.deleteCategory(id)
      sendSuccess(res, null, 'Category deleted successfully')
    } catch (error) {
      next(error)
    }
  }
}

export const categoryController = new CategoryController()
