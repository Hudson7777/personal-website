import jwt, { SignOptions } from 'jsonwebtoken'

export interface TokenPayload {
  id: string
  email: string
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  return secret
}

const getRefreshSecret = (): string => {
  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not set')
  }
  return secret
}

export const generateAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '30m',
  }
  return jwt.sign(payload, getJwtSecret(), options)
}

export const generateRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '90d',
  }
  return jwt.sign(payload, getRefreshSecret(), options)
}

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, getJwtSecret()) as TokenPayload
  } catch {
    return null
  }
}

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, getRefreshSecret()) as TokenPayload
  } catch {
    return null
  }
}
