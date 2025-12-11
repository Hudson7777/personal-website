import { z } from 'zod'

/**
 * 创建分类的验证 schema
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50, 'Category name must be less than 50 characters'),
  description: z.string().optional().nullable(),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>

/**
 * 更新分类的验证 schema
 */
export const updateCategorySchema = createCategorySchema.partial()

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
