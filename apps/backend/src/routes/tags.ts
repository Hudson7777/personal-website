import { Router } from 'express'
import { tagController } from '../controllers/tagController'

const router = Router()

/**
 * 标签路由
 */

// 获取所有标签
router.get('/', tagController.getTags.bind(tagController))

// 获取单个标签
router.get('/:id', tagController.getTagById.bind(tagController))

// 创建标签
router.post('/', tagController.createTag.bind(tagController))

// 更新标签
router.put('/:id', tagController.updateTag.bind(tagController))

// 删除标签
router.delete('/:id', tagController.deleteTag.bind(tagController))

export default router
