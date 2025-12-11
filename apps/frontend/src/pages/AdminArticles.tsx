import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '@/lib/api'
import Button from '@/components/Button'

interface Article {
  id: string
  title: string
  category: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      setError('')
      const response = await api.get('/articles?limit=100')
      setArticles(response.data.data.items || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      await api.delete(`/articles/${id}`)
      setArticles(articles.filter(a => a.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article')
    }
  }

  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      await api.put(`/articles/${id}`, { published: !published })
      setArticles(articles.map(a => (a.id === id ? { ...a, published: !published } : a)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article')
    }
  }

  const categoryColors: Record<string, string> = {
    ai: 'bg-blue-500/10 text-blue-600',
    travel: 'bg-green-500/10 text-green-600',
    photography: 'bg-yellow-500/10 text-yellow-600',
    history: 'bg-red-500/10 text-red-600',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Articles</h1>
          <p className="text-muted-foreground">Manage your articles</p>
        </div>
        <Link to="/admin/articles/new">
          <Button>Create Article</Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card-base p-4 h-20 animate-pulse" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="card-base p-12 text-center">
          <p className="text-muted-foreground mb-4">No articles yet</p>
          <Link to="/admin/articles/new">
            <Button>Create your first article</Button>
          </Link>
        </div>
      ) : (
        <div className="card-base overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-card/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-card/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{article.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        categoryColors[article.category] || 'bg-gray-500/10 text-gray-600'
                      }`}
                    >
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        article.published
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-gray-500/10 text-gray-600'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleTogglePublish(article.id, article.published)}
                        className="text-xs px-3 py-1 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                      >
                        {article.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <Link to={`/admin/articles/${article.id}/edit`}>
                        <button className="text-xs px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-xs px-3 py-1 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
