import { z } from 'zod'

/**
 * 创建标签的验证 schema
 */
export const createTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name must be less than 50 characters'),
})

export type CreateTagInput = z.infer<typeof createTagSchema>

/**
 * 更新标签的验证 schema
 */
export const updateTagSchema = createTagSchema.partial()

export type UpdateTagInput = z.infer<typeof updateTagSchema>
