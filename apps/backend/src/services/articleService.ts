import { prisma } from '../index'
import { CreateArticleInput, UpdateArticleInput, QueryArticlesInput } from '../schemas/articleSchema'
import { NotFoundError } from '../utils/errors'

/**
 * 文章服务层
 */
export class ArticleService {
  /**
   * 获取文章列表（支持分页、筛选、排序）
   */
  async getArticles(query: QueryArticlesInput) {
    const { page, limit, category, published, search, sort } = query

    // 构建查询条件
    const where: any = {}

    if (category) {
      where.category = category
    }

    if (published !== undefined) {
      where.published = published
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ]
    }

    // 计算分页
    const skip = (page - 1) * limit

    // 构建排序
    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'oldest') {
      orderBy = { createdAt: 'asc' }
    } else if (sort === 'popular') {
      // 这里可以根据浏览量或评论数排序，暂时按更新时间排序
      orderBy = { updatedAt: 'desc' }
    }

    // 并行查询总数和数据
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
        },
      }),
      prisma.article.count({ where }),
    ])

    return {
      articles: articles.map(article => this.formatArticle(article)),
      total,
      page,
      limit,
    }
  }

  /**
   * 获取单篇文章
   */
  async getArticleById(id: string) {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!article) {
      throw new NotFoundError('Article')
    }

    return this.formatArticle(article)
  }

  /**
   * 创建文章
   */
  async createArticle(data: CreateArticleInput, authorId: string) {
    const article = await prisma.article.create({
      data: {
        ...data,
        authorId,
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

    return this.formatArticle(article)
  }

  /**
   * 更新文章
   */
  async updateArticle(id: string, data: UpdateArticleInput) {
    const article = await prisma.article.update({
      where: { id },
      data,
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

    return this.formatArticle(article)
  }

  /**
   * 删除文章
   */
  async deleteArticle(id: string) {
    await prisma.article.delete({
      where: { id },
    })
  }

  /**
   * 获取相关文章
   */
  async getRelatedArticles(articleId: string, limit: number = 3) {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { category: true },
    })

    if (!article) {
      throw new NotFoundError('Article')
    }

    const relatedArticles = await prisma.article.findMany({
      where: {
        category: article.category,
        id: { not: articleId },
        published: true,
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
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

    return relatedArticles.map(a => this.formatArticle(a))
  }

  /**
   * 格式化文章数据
   */
  private formatArticle(article: any) {
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      category: article.category,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      tags: article.tags ? article.tags.split(',').filter((t: string) => t.trim()) : [],
      published: article.published,
      author: article.author,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      commentCount: article.comments?.length || 0,
    }
  }
}

export const articleService = new ArticleService()
