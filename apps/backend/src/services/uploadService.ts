import { deleteUploadedFile, getFileUrl } from '../middleware/upload'
import { ValidationError } from '../utils/errors'

/**
 * 上传服务层
 */
export class UploadService {
  /**
   * 处理单文件上传
   */
  async uploadFile(file: Express.Multer.File | undefined) {
    if (!file) {
      throw new ValidationError('No file provided')
    }

    return {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: getFileUrl(file.filename),
    }
  }

  /**
   * 处理多文件上传
   */
  async uploadFiles(files: Express.Multer.File[] | undefined) {
    if (!files || files.length === 0) {
      throw new ValidationError('No files provided')
    }

    return files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: getFileUrl(file.filename),
    }))
  }

  /**
   * 删除文件
   */
  async deleteFile(filename: string) {
    // 验证文件名格式（防止路径遍历攻击）
    if (filename.includes('/') || filename.includes('\\') || filename.includes('..')) {
      throw new ValidationError('Invalid filename')
    }

    const success = deleteUploadedFile(filename)
    if (!success) {
      throw new ValidationError('File not found or could not be deleted')
    }

    return { message: 'File deleted successfully' }
  }
}

export const uploadService = new UploadService()
