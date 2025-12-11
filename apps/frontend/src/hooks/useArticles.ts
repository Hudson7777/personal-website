import { useState, useEffect } from 'react'
import { Article, ArticleCategory, getArticlesByCategory, mockArticles } from '@/data/mockArticles'

interface UseArticlesOptions {
  category?: ArticleCategory
  limit?: number
}

export const useArticles = (options?: UseArticlesOptions) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))

        let data = mockArticles

        if (options?.category) {
          data = getArticlesByCategory(options.category)
        }

        if (options?.limit) {
          data = data.slice(0, options.limit)
        }

        setArticles(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [options?.category, options?.limit])

  return { articles, isLoading, error }
}
