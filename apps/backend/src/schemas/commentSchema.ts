import { z } from 'zod'

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comment content is required').max(5000, 'Comment is too long'),
  parentId: z.string().optional(),
})

export const updateCommentSchema = z.object({
  content: z.string().min(1, 'Comment content is required').max(5000, 'Comment is too long'),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
