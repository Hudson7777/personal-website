import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '@/lib/api'

interface AdminComment {
  id: string
  content: string
  createdAt: string
  author: { id: string; name: string; email: string; avatar: string | null }
  article: { id: string; title: string; category: string }
  replies: { id: string; content: string; author: { name: string } }[]
}

export default function AdminComments() {
  const [comments,   setComments]   = useState<AdminComment[]>([])
  const [isLoading,  setIsLoading]  = useState(true)
  const [error,      setError]      = useState('')
  const [page,       setPage]       = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchComments(page)
  }, [page])

  const fetchComments = async (p: number) => {
    try {
      setIsLoading(true)
      setError('')
      const res = await api.get(`/admin/comments?page=${p}&limit=20`)
      setComments(res.data.data.items || [])
      setTotalPages(res.data.data.totalPages || 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this comment and all its replies?')) return
    try {
      await api.delete(`/admin/comments/${id}`)
      setComments(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const categoryColors: Record<string, string> = {
    ai:          'bg-blue-50 text-blue-700',
    travel:      'bg-emerald-50 text-emerald-700',
    photography: 'bg-violet-50 text-violet-700',
    history:     'bg-amber-50 text-amber-700',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Comments</h1>
          <p className="text-muted-foreground text-sm">Moderate and manage reader comments</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="card-base p-4 h-20 animate-pulse" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="card-base p-12 text-center">
          <p className="text-muted-foreground">No comments yet.</p>
        </div>
      ) : (
        <>
          <div className="card-base overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Author</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Comment</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Article</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comments.map(comment => (
                  <tr key={comment.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-foreground">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.author.email}</p>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-sm text-foreground line-clamp-2">{comment.content}</p>
                      {comment.replies.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        to={`/articles/${comment.article.id}`}
                        className="text-sm text-foreground hover:text-accent transition-colors line-clamp-1 block"
                        target="_blank"
                      >
                        {comment.article.title}
                      </Link>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        categoryColors[comment.article.category] || 'bg-muted text-muted-foreground'
                      }`}>
                        {comment.article.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 transition-colors"
              >
                ← Prev
              </button>
              <span className="px-4 py-2 text-sm text-muted-foreground">
                Page {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
