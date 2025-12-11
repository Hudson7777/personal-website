import { Router } from 'express'
import { seoController } from '../controllers/seoController'

const router = Router()

/**
 * SEO 路由
 */

// 获取 Sitemap
router.get('/sitemap.xml', seoController.getSitemap.bind(seoController))

export default router
