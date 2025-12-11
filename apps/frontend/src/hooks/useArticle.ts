import { useState, useEffect } from 'react'
import { Article, getArticleById } from '@/data/mockArticles'

export const useArticle = (id: string | undefined) => {
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Article ID is required')
      setIsLoading(false)
      return
    }

    const fetchArticle = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))

        const data = getArticleById(id)

        if (!data) {
          setError('Article not found')
          setArticle(null)
        } else {
          setArticle(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  return { article, isLoading, error }
}
