import multer, { StorageEngine, FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'
import { Request } from 'express'
import { ValidationError } from '../utils/errors'

/**
 * 上传文件配置
 */
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

// 确保上传目录存在
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

/**
 * 自定义存储引擎
 */
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // 生成唯一文件名：时间戳 + 随机数 + 原始扩展名
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    const ext = path.extname(file.originalname)
    const filename = `${timestamp}-${random}${ext}`
    cb(null, filename)
  },
})

/**
 * 文件过滤器
 */
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  // 检查 MIME 类型
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new ValidationError(`Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`))
  }

  // 检查文件扩展名
  const ext = path.extname(file.originalname).toLowerCase()
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(new ValidationError(`Invalid file extension. Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`))
  }

  cb(null, true)
}

/**
 * 创建 Multer 实例
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
})

/**
 * 单文件上传中间件
 */
export const uploadSingle = upload.single('file')

/**
 * 多文件上传中间件
 */
export const uploadMultiple = upload.array('files', 10)

/**
 * 获取上传文件的 URL
 */
export const getFileUrl = (filename: string): string => {
  return `/uploads/${filename}`
}

/**
 * 删除上传的文件
 */
export const deleteUploadedFile = (filename: string): boolean => {
  try {
    const filePath = path.join(UPLOAD_DIR, filename)
    
    // 安全检查：确保文件在上传目录内
    if (!filePath.startsWith(UPLOAD_DIR)) {
      return false
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting file:', error)
    return false
  }
}
