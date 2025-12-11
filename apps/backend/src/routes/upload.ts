import { Router } from 'express'
import { uploadSingle, uploadMultiple } from '../middleware/upload'
import { uploadController } from '../controllers/uploadController'

const router = Router()

/**
 * 文件上传路由
 */

// 上传单个文件
router.post('/', uploadSingle, uploadController.uploadFile.bind(uploadController))

// 上传多个文件
router.post('/multiple', uploadMultiple, uploadController.uploadFiles.bind(uploadController))

// 删除文件
router.delete('/:filename', uploadController.deleteFile.bind(uploadController))

export default router
