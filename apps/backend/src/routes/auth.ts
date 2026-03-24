import { Router } from 'express'
import { authController } from '../controllers/authController'
import { authMiddleware } from '../middleware/auth'

const router = Router()

// Public
router.post('/login',   authController.login.bind(authController))
router.post('/refresh', authController.refresh.bind(authController))
router.post('/logout',  authController.logout.bind(authController))

// Protected — require auth
router.get('/me',          authMiddleware, authController.getMe.bind(authController))
router.put('/profile',     authMiddleware, authController.updateProfile.bind(authController))

export default router
