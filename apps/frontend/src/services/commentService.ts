import api from '@/lib/api'

export interface CommentAuthor {
  id: string
  name: string
  avatar: string | null
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  author: CommentAuthor
  replies?: Comment[]
}

export interface CommentTree extends Comment {
  replies: CommentTree[]
}

class CommentService {
  /**
   * 获取文章的所有评论
   */
  async getComments(articleId: string): Promise<CommentTree[]> {
    try {
      const response = await api.get(`/articles/${articleId}/comments`)
      return response.data.data || []
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      throw error
    }
  }

  /**
   * 创建评论
   */
  async createComment(
    articleId: string,
    content: string,
    parentId?: string
  ): Promise<Comment> {
    try {
      const response = await api.post(`/articles/${articleId}/comments`, {
        content,
        parentId,
      })
      return response.data.data
    } catch (error) {
      console.error('Failed to create comment:', error)
      throw error
    }
  }

  /**
   * 更新评论
   */
  async updateComment(articleId: string, commentId: string, content: string): Promise<Comment> {
    try {
      const response = await api.put(`/articles/${articleId}/comments/${commentId}`, {
        content,
      })
      return response.data.data
    } catch (error) {
      console.error('Failed to update comment:', error)
      throw error
    }
  }

  /**
   * 删除评论
   */
  async deleteComment(articleId: string, commentId: string): Promise<void> {
    try {
      await api.delete(`/articles/${articleId}/comments/${commentId}`)
    } catch (error) {
      console.error('Failed to delete comment:', error)
      throw error
    }
  }
}

export const commentService = new CommentService()
