import { Router } from 'express'
import { categoryController } from '../controllers/categoryController'

const router = Router()

/**
 * 分类路由
 */

// 获取所有分类
router.get('/', categoryController.getCategories.bind(categoryController))

// 获取单个分类
router.get('/:id', categoryController.getCategoryById.bind(categoryController))

// 创建分类
router.post('/', categoryController.createCategory.bind(categoryController))

// 更新分类
router.put('/:id', categoryController.updateCategory.bind(categoryController))

// 删除分类
router.delete('/:id', categoryController.deleteCategory.bind(categoryController))

export default router
