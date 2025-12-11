// User types
export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

// Article types
export type ArticleCategory = 'ai' | 'travel' | 'photography' | 'history'

export interface Article {
  id: string
  title: string
  content: any // TipTap JSON content
  category: ArticleCategory
  tags: string[]
  excerpt?: string
  coverImage?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string
}

export interface CreateArticleInput {
  title: string
  content: any
  category: ArticleCategory
  tags: string[]
  excerpt?: string
  coverImage?: string
  published?: boolean
}

export interface UpdateArticleInput {
  title?: string
  content?: any
  category?: ArticleCategory
  tags?: string[]
  excerpt?: string
  coverImage?: string
  published?: boolean
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Auth types
export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}
