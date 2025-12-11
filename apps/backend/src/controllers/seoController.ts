import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class SEOController {
  /**
   * 生成 Sitemap
   * GET /sitemap.xml
   */
  async getSitemap(req: Request, res: Response, next: NextFunction) {
    try {
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

      // Get all published articles
      const articles = await prisma.article.findMany({
        where: { published: true },
        select: {
          id: true,
          category: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: 'desc' },
      })

      // Build sitemap XML
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

      // Add homepage
      sitemap += '  <url>\n'
      sitemap += `    <loc>${baseUrl}/</loc>\n`
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
      sitemap += '    <priority>1.0</priority>\n'
      sitemap += '  </url>\n'

      // Add category pages
      const categories = ['ai', 'travel', 'photography', 'history']
      for (const category of categories) {
        sitemap += '  <url>\n'
        sitemap += `    <loc>${baseUrl}/${category}</loc>\n`
        sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
        sitemap += '    <priority>0.8</priority>\n'
        sitemap += '  </url>\n'
      }

      // Add article pages
      for (const article of articles) {
        const articleUrl = `${baseUrl}/articles/${article.id}`
        const lastmod = article.updatedAt.toISOString().split('T')[0]

        sitemap += '  <url>\n'
        sitemap += `    <loc>${articleUrl}</loc>\n`
        sitemap += `    <lastmod>${lastmod}</lastmod>\n`
        sitemap += '    <priority>0.7</priority>\n'
        sitemap += '  </url>\n'
      }

      sitemap += '</urlset>'

      // Set response headers
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.setHeader('Cache-Control', 'public, max-age=3600') // Cache for 1 hour
      res.send(sitemap)
    } catch (error) {
      next(error)
    }
  }
}

export const seoController = new SEOController()
