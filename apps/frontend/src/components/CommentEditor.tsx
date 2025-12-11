import { useState } from 'react'
import Button from './Button'

interface CommentEditorProps {
  initialContent: string
  onSave: (content: string) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function CommentEditor({
  initialContent,
  onSave,
  onCancel,
  isLoading = false,
}: CommentEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [error, setError] = useState('')

  const handleSave = async () => {
    setError('')

    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    try {
      await onSave(content)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update comment')
    }
  }

  return (
    <div className="card-base p-4 bg-accent/5 border border-accent/20">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none mb-3"
        rows={3}
        disabled={isLoading}
      />

      {error && (
        <div className="mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading || content === initialContent}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  )
}
