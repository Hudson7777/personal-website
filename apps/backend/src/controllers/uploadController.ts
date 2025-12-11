import { Request, Response, NextFunction } from 'express'
import { uploadService } from '../services/uploadService'
import { sendSuccess, sendError } from '../utils/response'

/**
 * 上传控制器
 */
export class UploadController {
  /**
   * 上传单个文件
   * POST /api/upload
   */
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = (req as any).file
      const result = await uploadService.uploadFile(file)
      sendSuccess(res, result, 'File uploaded successfully', 201)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 上传多个文件
   * POST /api/upload/multiple
   */
  async uploadFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const files = (req as any).files
      const results = await uploadService.uploadFiles(files)
      sendSuccess(res, results, 'Files uploaded successfully', 201)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 删除文件
   * DELETE /api/upload/:filename
   */
  async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const { filename } = req.params
      const result = await uploadService.deleteFile(filename)
      sendSuccess(res, result, 'File deleted successfully')
    } catch (error) {
      next(error)
    }
  }
}

export const uploadController = new UploadController()
