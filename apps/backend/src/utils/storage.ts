import fs from 'fs/promises'
import path from 'path'

export interface StorageService {
  upload(file: Express.Multer.File): Promise<string>
  delete(url: string): Promise<void>
  getUrl(key: string): string
}

export class LocalStorageService implements StorageService {
  private uploadDir: string

  constructor(uploadDir: string = './public/uploads') {
    this.uploadDir = uploadDir
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const filename = `${Date.now()}-${file.originalname}`
    const filepath = path.join(this.uploadDir, filename)
    
    await fs.mkdir(this.uploadDir, { recursive: true })
    await fs.writeFile(filepath, file.buffer)
    
    return `/uploads/${filename}`
  }

  async delete(url: string): Promise<void> {
    const filename = url.split('/').pop()
    if (!filename) return
    
    const filepath = path.join(this.uploadDir, filename)
    try {
      await fs.unlink(filepath)
    } catch (error) {
      console.error('Failed to delete file:', error)
    }
  }

  getUrl(key: string): string {
    return `/uploads/${key}`
  }
}

// OSS Storage Service (placeholder for future implementation)
export class OSSStorageService implements StorageService {
  async upload(file: Express.Multer.File): Promise<string> {
    // TODO: Implement OSS upload
    throw new Error('OSS storage not implemented yet')
  }

  async delete(url: string): Promise<void> {
    // TODO: Implement OSS delete
    throw new Error('OSS storage not implemented yet')
  }

  getUrl(key: string): string {
    // TODO: Implement OSS URL generation
    throw new Error('OSS storage not implemented yet')
  }
}

// Factory function
export const getStorageService = (): StorageService => {
  const storageType = process.env.STORAGE_TYPE || 'local'
  
  if (storageType === 'oss') {
    return new OSSStorageService()
  }
  
  return new LocalStorageService(process.env.UPLOAD_DIR)
}
