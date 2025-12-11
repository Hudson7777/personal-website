import { prisma } from '../index'
import { CreateTagInput, UpdateTagInput } from '../schemas/tagSchema'
import { NotFoundError, ConflictError } from '../utils/errors'

/**
 * 标签服务层
 */
export class TagService {
  /**
   * 获取所有标签
   */
  async getTags() {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    })
    return tags
  }

  /**
   * 获取单个标签
   */
  async getTagById(id: string) {
    const tag = await prisma.tag.findUnique({
      where: { id },
    })

    if (!tag) {
      throw new NotFoundError('Tag')
    }

    return tag
  }

  /**
   * 创建标签
   */
  async createTag(data: CreateTagInput) {
    // 检查标签是否已存在
    const existingTag = await prisma.tag.findUnique({
      where: { name: data.name },
    })

    if (existingTag) {
      throw new ConflictError(`Tag "${data.name}" already exists`)
    }

    const tag = await prisma.tag.create({
      data,
    })

    return tag
  }

  /**
   * 更新标签
   */
  async updateTag(id: string, data: UpdateTagInput) {
    // 如果更新名称，检查是否已存在
    if (data.name) {
      const existingTag = await prisma.tag.findUnique({
        where: { name: data.name },
      })

      if (existingTag && existingTag.id !== id) {
        throw new ConflictError(`Tag "${data.name}" already exists`)
      }
    }

    const tag = await prisma.tag.update({
      where: { id },
      data,
    })

    return tag
  }

  /**
   * 删除标签
   */
  async deleteTag(id: string) {
    await prisma.tag.delete({
      where: { id },
    })
  }
}

export const tagService = new TagService()
