import { z } from 'zod'

/**
 * 文章分类枚举
 */
export const ArticleCategory = z.enum(['ai', 'travel', 'photography', 'history'])
export type ArticleCategory = z.infer<typeof ArticleCategory>

/**
 * 创建文章的验证 schema
 */
export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required'),
  category: ArticleCategory,
  excerpt: z.string().optional().nullable(),
  coverImage: z.string().url('Invalid cover image URL').optional().nullable(),
  tags: z.string().optional().default(''),
  published: z.boolean().optional().default(false),
})

export type CreateArticleInput = z.infer<typeof createArticleSchema>

/**
 * 更新文章的验证 schema
 */
export const updateArticleSchema = createArticleSchema.partial()

export type UpdateArticleInput = z.infer<typeof updateArticleSchema>

/**
 * 查询文章列表的验证 schema
 */
export const queryArticlesSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  category: ArticleCategory.optional(),
  published: z.coerce.boolean().optional(),
  search: z.string().optional(),
  sort: z.enum(['latest', 'oldest', 'popular']).optional().default('latest'),
})

export type QueryArticlesInput = z.infer<typeof queryArticlesSchema>
