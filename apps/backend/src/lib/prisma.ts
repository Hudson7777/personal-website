import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load .env before creating PrismaClient so DATABASE_URL is available
dotenv.config()

const prisma = new PrismaClient()

export default prisma
