import { PrismaClient, Comment } from '@prisma/client'

const prisma = new PrismaClient()

export interface CommentWithAuthor extends Comment {
  author: {
    id: string
    name: string
    avatar: string | null
  }
  replies?: CommentWithAuthor[]
}

export interface CommentTree extends CommentWithAuthor {
  replies: CommentTree[]
}

class CommentService {
  /**
   * 获取文章的所有评论（树形结构）
   */
  async getCommentsByArticleId(articleId: string): Promise<CommentTree[]> {
    const comments = await prisma.comment.findMany({
      where: { articleId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    // Build tree structure - only return top-level comments
    return comments
      .filter(comment => !comment.parentId)
      .map(comment => this.buildCommentTree(comment as any))
  }

  /**
   * 递归构建评论树
   */
  private buildCommentTree(comment: CommentWithAuthor): CommentTree {
    return {
      ...comment,
      replies: (comment.replies || []).map(reply => this.buildCommentTree(reply as any)),
    }
  }

  /**
   * 创建评论
   */
  async createComment(
    articleId: string,
    authorId: string,
    content: string,
    parentId?: string
  ): Promise<CommentWithAuthor> {
    // Verify article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    })

    if (!article) {
      throw new Error('Article not found')
    }

    // If parentId is provided, verify parent comment exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      })

      if (!parentComment) {
        throw new Error('Parent comment not found')
      }

      // Ensure parent comment belongs to the same article
      if (parentComment.articleId !== articleId) {
        throw new Error('Parent comment does not belong to this article')
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        authorId,
        parentId: parentId || null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return comment as CommentWithAuthor
  }

  /**
   * 更新评论
   */
  async updateComment(commentId: string, content: string, userId: string): Promise<CommentWithAuthor> {
    // Verify comment exists and user is the author
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId !== userId) {
      throw new Error('You can only edit your own comments')
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return updatedComment as CommentWithAuthor
  }

  /**
   * 删除评论
   */
  async deleteComment(commentId: string, userId: string, isAdmin: boolean): Promise<void> {
    // Verify comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    // Check if user is author or admin
    if (comment.authorId !== userId && !isAdmin) {
      throw new Error('You can only delete your own comments')
    }

    // Delete comment (cascade will delete replies)
    await prisma.comment.delete({
      where: { id: commentId },
    })
  }

  /**
   * 获取单个评论
   */
  async getCommentById(commentId: string): Promise<CommentWithAuthor | null> {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return comment as CommentWithAuthor | null
  }
}

export const commentService = new CommentService()
