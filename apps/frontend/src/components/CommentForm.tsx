import { useState } from 'react'
import { useAuthStore } from '@/stores/auth'
import Button from './Button'
import { Link } from 'react-router-dom'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
  isLoading?: boolean
  replyingTo?: { id: string; author: string }
  onCancelReply?: () => void
}

export default function CommentForm({
  onSubmit,
  isLoading = false,
  replyingTo,
  onCancelReply,
}: CommentFormProps) {
  const { accessToken } = useAuthStore()
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    try {
      await onSubmit(content)
      setContent('')
      onCancelReply?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment')
    }
  }

  if (!accessToken) {
    return (
      <div className="card-base p-6 text-center">
        <p className="text-muted-foreground mb-4">
          You must be logged in to comment
        </p>
        <Link to="/admin/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-base p-6">
      {replyingTo && (
        <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-between">
          <p className="text-sm text-foreground">
            Replying to <span className="font-medium">@{replyingTo.author}</span>
          </p>
          <button
            type="button"
            onClick={onCancelReply}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          rows={4}
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        {replyingTo && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancelReply}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  )
}
