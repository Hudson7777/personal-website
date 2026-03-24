import { useState, useEffect } from 'react'
import { Article, ArticleCategory } from '@/data/mockArticles'
import articleService from '@/services/articleService'

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

        let data: Article[]
        if (options?.category) {
          data = await articleService.getArticlesByCategory(options.category)
        } else {
          data = await articleService.getAllArticles()
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
