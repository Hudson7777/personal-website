/**
 * Article Service
 * Handles all article-related API calls
 */

import api from '@/lib/api'
import { Article, ArticleCategory, getArticlesByCategory, getArticleById, getLatestArticles, getRelatedArticles } from '@/data/mockArticles'

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

class ArticleService {
  private baseUrl = '/api'
  private useMockData = false // Set to true to fallback to mock data

  /**
   * Get all articles
   */
  async getAllArticles(): Promise<Article[]> {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Article>>>(`${this.baseUrl}/articles`)
      return response.data.data.items
    } catch (error) {
      console.error('Failed to fetch articles:', error)
      if (this.useMockData) {
        return getArticlesByCategory('ai' as ArticleCategory).concat(
          getArticlesByCategory('travel' as ArticleCategory),
          getArticlesByCategory('photography' as ArticleCategory),
          getArticlesByCategory('history' as ArticleCategory)
        )
      }
      throw error
    }
  }

  /**
   * Get articles by category
   */
  async getArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Article>>>(`${this.baseUrl}/articles`, {
        params: { category, limit: 100 },
      })
      return response.data.data.items
    } catch (error) {
      console.error('Failed to fetch articles by category:', error)
      if (this.useMockData) {
        return getArticlesByCategory(category)
      }
      throw error
    }
  }

  /**
   * Get single article by ID
   */
  async getArticleById(id: string): Promise<Article | null> {
    try {
      const response = await api.get<ApiResponse<Article>>(`${this.baseUrl}/articles/${id}`)
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch article:', error)
      if (this.useMockData) {
        return getArticleById(id) || null
      }
      throw error
    }
  }

  /**
   * Get latest articles
   */
  async getLatestArticles(limit: number = 3): Promise<Article[]> {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Article>>>(`${this.baseUrl}/articles`, {
        params: { limit, sort: 'latest' },
      })
      return response.data.data.items
    } catch (error) {
      console.error('Failed to fetch latest articles:', error)
      if (this.useMockData) {
        return getLatestArticles(limit)
      }
      throw error
    }
  }

  /**
   * Get related articles
   */
  async getRelatedArticles(articleId: string, limit: number = 3): Promise<Article[]> {
    try {
      const response = await api.get<ApiResponse<Article[]>>(`${this.baseUrl}/articles/${articleId}/related`, {
        params: { limit },
      })
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch related articles:', error)
      if (this.useMockData) {
        return getRelatedArticles(articleId, limit)
      }
      throw error
    }
  }

  /**
   * Create article (admin only)
   */
  async createArticle(_data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> {
    try {
      throw new Error('Not implemented yet')
    } catch (error) {
      console.error('Failed to create article:', error)
      throw error
    }
  }

  /**
   * Update article (admin only)
   */
  async updateArticle(_id: string, _data: Partial<Article>): Promise<Article> {
    try {
      throw new Error('Not implemented yet')
    } catch (error) {
      console.error('Failed to update article:', error)
      throw error
    }
  }

  /**
   * Delete article (admin only)
   */
  async deleteArticle(_id: string): Promise<void> {
    try {
      throw new Error('Not implemented yet')
    } catch (error) {
      console.error('Failed to delete article:', error)
      throw error
    }
  }
}

export default new ArticleService()
