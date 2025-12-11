import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function initAdmin() {
  try {
    console.log('🔐 Initializing admin accounts...')

    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim())
    const adminPassword = process.env.ADMIN_PASSWORD || 'XuhaoraN2000'

    if (adminEmails.length === 0) {
      console.error('❌ ADMIN_EMAILS environment variable is not set')
      process.exit(1)
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(adminPassword, 10)

    for (const email of adminEmails) {
      if (!email) continue

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        console.log(`✅ Admin user ${email} already exists`)
        continue
      }

      // Create admin user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: email.split('@')[0], // Use email prefix as name
        },
      })

      console.log(`✅ Created admin user: ${email}`)
    }

    console.log('✨ Admin initialization completed!')
  } catch (error) {
    console.error('❌ Error initializing admin:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

initAdmin()
