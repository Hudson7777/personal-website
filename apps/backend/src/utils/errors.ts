/**
 * 自定义错误类
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public error?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

/**
 * 验证错误
 */
export class ValidationError extends AppError {
  constructor(message: string, error?: string) {
    super(message, 400, error || 'Validation Error')
    this.name = 'ValidationError'
  }
}

/**
 * 未找到错误
 */
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'Not Found')
    this.name = 'NotFoundError'
  }
}

/**
 * 未授权错误
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

/**
 * 禁止访问错误
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'Forbidden')
    this.name = 'ForbiddenError'
  }
}

/**
 * 冲突错误
 */
export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'Conflict')
    this.name = 'ConflictError'
  }
}

/**
 * 内部服务器错误
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500, 'Internal Server Error')
    this.name = 'InternalServerError'
  }
}
