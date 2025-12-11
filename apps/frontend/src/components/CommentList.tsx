import { useState } from 'react'
import { useAuthStore } from '@/stores/auth'
import { Comment, CommentTree } from '@/services/commentService'
import Button from './Button'
import Avatar from './Avatar'

interface CommentListProps {
  comments: CommentTree[]
  onReply: (parentId: string, parentAuthor: string) => void
  onEdit: (commentId: string, content: string) => void
  onDelete: (commentId: string) => void
  isLoading?: boolean
}

export default function CommentList({
  comments,
  onReply,
  onEdit,
  onDelete,
  isLoading = false,
}: CommentListProps) {
  const { user } = useAuthStore()
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies)
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId)
    } else {
      newExpanded.add(commentId)
    }
    setExpandedReplies(newExpanded)
  }

  const CommentItem = ({ comment, depth = 0 }: { comment: CommentTree; depth?: number }) => {
    const isAuthor = user?.id === comment.author.id
    const hasReplies = comment.replies && comment.replies.length > 0
    const isExpanded = expandedReplies.has(comment.id)

    return (
      <div key={comment.id} className={`${depth > 0 ? 'ml-8' : ''} mb-6`}>
        <div className="card-base p-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar
              src={comment.author.avatar}
              alt={comment.author.name}
              size="sm"
              fallback={comment.author.name.charAt(0)}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{comment.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Comment Content */}
          <p className="text-sm text-foreground mb-4 whitespace-pre-wrap break-words">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => onReply(comment.id, comment.author.name)}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Reply
            </button>
            {isAuthor && (
              <>
                <span className="text-border">•</span>
                <button
                  onClick={() => onEdit(comment.id, comment.content)}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Edit
                </button>
                <span className="text-border">•</span>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="text-muted-foreground hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Replies */}
        {hasReplies && (
          <div className="mt-4">
            <button
              onClick={() => toggleReplies(comment.id)}
              className="text-xs text-muted-foreground hover:text-accent transition-colors mb-3"
            >
              {isExpanded ? '▼' : '▶'} {comment.replies!.length} {comment.replies!.length === 1 ? 'reply' : 'replies'}
            </button>

            {isExpanded && (
              <div className="space-y-4">
                {comment.replies!.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-base p-4 h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
