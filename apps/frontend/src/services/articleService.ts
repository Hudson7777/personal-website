/**
 * Article Service
 * Handles all article-related API calls
 */

import api from '@/lib/api'
import { Article, ArticleCategory, computeReadTime } from '@/data/mockArticles'

interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

type CreateArticleData = Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'readTime' | 'commentCount'>
type UpdateArticleData = Partial<Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'readTime' | 'commentCount'>>

class ArticleService {
  private withReadTime(article: Article): Article {
    return { ...article, readTime: computeReadTime(article.content || '') }
  }

  async getAllArticles(): Promise<Article[]> {
    const response = await api.get<ApiResponse<PaginatedResponse<Article>>>('/articles', {
      params: { published: true, limit: 100 },
    })
    return response.data.data.items.map(a => this.withReadTime(a))
  }

  async getArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
    const response = await api.get<ApiResponse<PaginatedResponse<Article>>>('/articles', {
      params: { category, published: true, limit: 100 },
    })
    return response.data.data.items.map(a => this.withReadTime(a))
  }

  async getArticleById(id: string): Promise<Article | null> {
    const response = await api.get<ApiResponse<Article>>(`/articles/${id}`)
    return this.withReadTime(response.data.data)
  }

  async getLatestArticles(limit: number = 3): Promise<Article[]> {
    const response = await api.get<ApiResponse<PaginatedResponse<Article>>>('/articles', {
      params: { limit, sort: 'latest', published: true },
    })
    return response.data.data.items.map(a => this.withReadTime(a))
  }

  async getRelatedArticles(articleId: string, limit: number = 3): Promise<Article[]> {
    const response = await api.get<ApiResponse<Article[]>>(`/articles/${articleId}/related`, {
      params: { limit },
    })
    return response.data.data.map(a => this.withReadTime(a))
  }

  async createArticle(data: CreateArticleData): Promise<Article> {
    const response = await api.post<ApiResponse<Article>>('/articles', data)
    return this.withReadTime(response.data.data)
  }

  async updateArticle(id: string, data: UpdateArticleData): Promise<Article> {
    const response = await api.put<ApiResponse<Article>>(`/articles/${id}`, data)
    return this.withReadTime(response.data.data)
  }

  async deleteArticle(id: string): Promise<void> {
    await api.delete(`/articles/${id}`)
  }
}

export default new ArticleService()
