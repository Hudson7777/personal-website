// Article categories
export const ARTICLE_CATEGORIES = {
  AI: 'ai',
  TRAVEL: 'travel',
  PHOTOGRAPHY: 'photography',
  HISTORY: 'history',
} as const

export const CATEGORY_LABELS = {
  ai: 'AI Articles',
  travel: 'Travel',
  photography: 'Photography',
  history: 'History',
} as const

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

// File upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

// API
export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api'
