import { useEffect, useState } from 'react'

interface Comment {
  id: string
  content: string
  author: {
    name: string
    email: string
  }
  article: {
    id: string
    title: string
  }
  createdAt: string
}

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      setError('')
      // This is a placeholder - you'll need to implement a comments list endpoint
      // For now, we'll show a message
      setComments([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (_id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return

    try {
      // This would need the article ID to delete properly
      // For now, just show a message
      alert('Delete functionality coming soon')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Comments</h1>
        <p className="text-muted-foreground">Manage article comments</p>
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
      ) : comments.length === 0 ? (
        <div className="card-base p-12 text-center">
          <p className="text-muted-foreground">No comments yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="card-base p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-medium text-foreground">{comment.author.name}</p>
                  <p className="text-sm text-muted-foreground">{comment.author.email}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm text-foreground mb-4 whitespace-pre-wrap">{comment.content}</p>

              <p className="text-xs text-muted-foreground mb-4">
                On article: <span className="font-medium">{comment.article.title}</span>
              </p>

              <button
                onClick={() => handleDelete(comment.id)}
                className="text-xs px-3 py-1 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
