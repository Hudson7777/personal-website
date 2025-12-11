import { prisma } from '../index'
import { CreateCategoryInput, UpdateCategoryInput } from '../schemas/categorySchema'
import { NotFoundError, ConflictError } from '../utils/errors'

/**
 * 分类服务层
 */
export class CategoryService {
  /**
   * 获取所有分类
   */
  async getCategories() {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
    return categories
  }

  /**
   * 获取单个分类
   */
  async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    })

    if (!category) {
      throw new NotFoundError('Category')
    }

    return category
  }

  /**
   * 创建分类
   */
  async createCategory(data: CreateCategoryInput) {
    // 检查分类是否已存在
    const existingCategory = await prisma.category.findUnique({
      where: { name: data.name },
    })

    if (existingCategory) {
      throw new ConflictError(`Category "${data.name}" already exists`)
    }

    const category = await prisma.category.create({
      data,
    })

    return category
  }

  /**
   * 更新分类
   */
  async updateCategory(id: string, data: UpdateCategoryInput) {
    // 如果更新名称，检查是否已存在
    if (data.name) {
      const existingCategory = await prisma.category.findUnique({
        where: { name: data.name },
      })

      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictError(`Category "${data.name}" already exists`)
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data,
    })

    return category
  }

  /**
   * 删除分类
   */
  async deleteCategory(id: string) {
    await prisma.category.delete({
      where: { id },
    })
  }
}

export const categoryService = new CategoryService()
