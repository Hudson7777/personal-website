/**
 * 生产环境初始化脚本
 * 用于在 Railway 上初始化数据库
 * 
 * 运行方式：
 * railway run pnpm db:init-production
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Initializing production database...\n')

  try {
    // 检查数据库连接
    console.log('1️⃣  Checking database connection...')
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful\n')

    // 检查表是否存在
    console.log('2️⃣  Checking database schema...')
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log(`✅ Found ${(tables as any[]).length} tables\n`)

    // 检查是否需要初始化数据
    console.log('3️⃣  Checking if data needs to be initialized...')
    const userCount = await prisma.user.count()
    const articleCount = await prisma.article.count()

    if (userCount === 0) {
      console.log('⚠️  No users found, initializing seed data...\n')
      
      // 创建用户
      const user = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: 'hashed_password_here',
          name: 'Hudson',
          bio: 'A passionate developer and content creator',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
      })
      console.log(`✅ User created: ${user.id}`)

      // 创建分类
      const categories = await Promise.all([
        prisma.category.create({
          data: {
            name: 'AI',
            description: 'Artificial Intelligence and Machine Learning',
          },
        }),
        prisma.category.create({
          data: {
            name: 'Travel',
            description: 'Travel stories and experiences',
          },
        }),
        prisma.category.create({
          data: {
            name: 'Photography',
            description: 'Photography tips and techniques',
          },
        }),
        prisma.category.create({
          data: {
            name: 'History',
            description: 'Historical topics and insights',
          },
        }),
      ])
      console.log(`✅ Categories created: ${categories.length}`)

      // 创建标签
      const tags = await Promise.all([
        prisma.tag.create({ data: { name: 'AI' } }),
        prisma.tag.create({ data: { name: 'Machine Learning' } }),
        prisma.tag.create({ data: { name: 'Future' } }),
        prisma.tag.create({ data: { name: 'Technology' } }),
        prisma.tag.create({ data: { name: 'Travel' } }),
        prisma.tag.create({ data: { name: 'Japan' } }),
        prisma.tag.create({ data: { name: 'Tokyo' } }),
        prisma.tag.create({ data: { name: 'Adventure' } }),
        prisma.tag.create({ data: { name: 'Photography' } }),
        prisma.tag.create({ data: { name: 'Landscape' } }),
        prisma.tag.create({ data: { name: 'Tips' } }),
        prisma.tag.create({ data: { name: 'Techniques' } }),
        prisma.tag.create({ data: { name: 'History' } }),
        prisma.tag.create({ data: { name: 'Renaissance' } }),
        prisma.tag.create({ data: { name: 'Culture' } }),
        prisma.tag.create({ data: { name: 'Art' } }),
      ])
      console.log(`✅ Tags created: ${tags.length}`)

      // 创建文章
      const articles = await Promise.all([
        prisma.article.create({
          data: {
            title: 'The Future of AI: Opportunities and Challenges',
            excerpt: 'Exploring the transformative potential of artificial intelligence and the challenges we need to address.',
            content: JSON.stringify({
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: { level: 1 },
                  content: [{ type: 'text', text: 'The Future of AI: Opportunities and Challenges' }],
                },
              ],
            }),
            category: 'ai',
            tags: 'AI,Machine Learning,Future,Technology',
            coverImage: 'https://images.unsplash.com/photo-1677442d019cecf8d5a594b4e1d0b5c5?w=800&h=400&fit=crop',
            published: true,
            authorId: user.id,
          },
        }),
        prisma.article.create({
          data: {
            title: 'Discovering Hidden Gems in Tokyo',
            excerpt: "A journey through Tokyo's lesser-known neighborhoods and local experiences.",
            content: JSON.stringify({
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: { level: 1 },
                  content: [{ type: 'text', text: 'Discovering Hidden Gems in Tokyo' }],
                },
              ],
            }),
            category: 'travel',
            tags: 'Travel,Japan,Tokyo,Adventure',
            coverImage: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a0?w=800&h=400&fit=crop',
            published: true,
            authorId: user.id,
          },
        }),
        prisma.article.create({
          data: {
            title: 'Mastering Landscape Photography',
            excerpt: 'Essential tips and techniques for capturing stunning landscape photographs.',
            content: JSON.stringify({
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: { level: 1 },
                  content: [{ type: 'text', text: 'Mastering Landscape Photography' }],
                },
              ],
            }),
            category: 'photography',
            tags: 'Photography,Landscape,Tips,Techniques',
            coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
            published: true,
            authorId: user.id,
          },
        }),
        prisma.article.create({
          data: {
            title: 'The Renaissance: A Rebirth of Human Potential',
            excerpt: 'Understanding the transformative period that shaped modern civilization.',
            content: JSON.stringify({
              type: 'doc',
              content: [
                {
                  type: 'heading',
                  attrs: { level: 1 },
                  content: [{ type: 'text', text: 'The Renaissance: A Rebirth of Human Potential' }],
                },
              ],
            }),
            category: 'history',
            tags: 'History,Renaissance,Culture,Art',
            coverImage: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=400&fit=crop',
            published: true,
            authorId: user.id,
          },
        }),
      ])
      console.log(`✅ Articles created: ${articles.length}\n`)
    } else {
      console.log(`✅ Database already initialized`)
      console.log(`   Users: ${userCount}`)
      console.log(`   Articles: ${articleCount}\n`)
    }

    console.log('🎉 Production database initialization completed!')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
