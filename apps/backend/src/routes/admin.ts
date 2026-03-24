import { Router } from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/auth'
import { adminController } from '../controllers/adminController'

const router = Router()

// All admin routes require auth + admin role
router.use(authMiddleware, adminMiddleware)

// Stats
router.get('/stats', adminController.getStats.bind(adminController))

// Comments management
router.get('/comments', adminController.getAllComments.bind(adminController))
router.delete('/comments/:id', adminController.deleteComment.bind(adminController))

export default router
