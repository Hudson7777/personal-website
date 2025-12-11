import { Router } from 'express'
import { authController } from '../controllers/authController'

const router = Router()

/**
 * 认证路由
 */

// 登录
router.post('/login', authController.login.bind(authController))

// 刷新 Token
router.post('/refresh', authController.refresh.bind(authController))

// 登出
router.post('/logout', authController.logout.bind(authController))

export default router
