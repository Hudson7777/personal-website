import { Response } from 'express'

/**
 * 统一的 API 响应格式
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message: string
}

/**
 * 发送成功响应
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Operation successful',
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  } as ApiResponse<T>)
}

/**
 * 发送错误响应
 */
export const sendError = (
  res: Response,
  error: string,
  message: string = 'Operation failed',
  statusCode: number = 400
) => {
  res.status(statusCode).json({
    success: false,
    error,
    message,
  } as ApiResponse)
}

/**
 * 发送分页响应
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const sendPaginated = <T>(
  res: Response,
  items: T[],
  total: number,
  page: number,
  limit: number,
  message: string = 'Operation successful',
  statusCode: number = 200
) => {
  const totalPages = Math.ceil(total / limit)
  res.status(statusCode).json({
    success: true,
    data: {
      items,
      total,
      page,
      limit,
      totalPages,
    },
    message,
  } as ApiResponse<PaginatedResponse<T>>)
}
