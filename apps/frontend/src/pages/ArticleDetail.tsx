import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useArticle } from '@/hooks/useArticle'
import { getRelatedArticles } from '@/data/mockArticles'
import { commentService, CommentTree } from '@/services/commentService'
import Container from '@/components/Container'
import Section from '@/components/Section'
import Avatar from '@/components/Avatar'
import Badge from '@/components/Badge'
import ArticleGrid from '@/components/ArticleGrid'
import Button from '@/components/Button'
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'
import CommentEditor from '@/components/CommentEditor'
import SEO from '@/components/SEO'

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { article, isLoading, error } = useArticle(id)
  const relatedArticles = article ? getRelatedArticles(article.id, 3) : []

  // Comments state
  const [comments, setComments] = useState<CommentTree[]>([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [replyingTo, setReplyingTo] = useState<{ id: string; author: string } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')

  const categoryColors: Record<string, string> = {
    ai: 'primary',
    travel: 'success',
    photography: 'warning',
    history: 'error',
  }

  // Load comments
  useEffect(() => {
    if (article?.id) {
      loadComments()
    }
  }, [article?.id])

  const loadComments = async () => {
    if (!article?.id) return
    try {
      setCommentsLoading(true)
      const data = await commentService.getComments(article.id)
      setComments(data)
    } catch (error) {
      console.error('Failed to load comments:', error)
    } finally {
      setCommentsLoading(false)
    }
  }

  const handleCreateComment = async (content: string) => {
    if (!article?.id) return
    try {
      await commentService.createComment(article.id, content, replyingTo?.id)
      await loadComments()
      setReplyingTo(null)
    } catch (error) {
      console.error('Failed to create comment:', error)
      throw error
    }
  }

  const handleEditComment = async (content: string) => {
    if (!article?.id || !editingId) return
    try {
      await commentService.updateComment(article.id, editingId, content)
      await loadComments()
      setEditingId(null)
    } catch (error) {
      console.error('Failed to update comment:', error)
      throw error
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!article?.id) return
    if (!confirm('Are you sure you want to delete this comment?')) return
    try {
      await commentService.deleteComment(article.id, commentId)
      await loadComments()
    } catch (error) {
      console.error('Failed to delete comment:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-card" />
        <Container>
          <div className="mt-8 space-y-4">
            <div className="h-8 bg-card rounded w-3/4" />
            <div className="h-4 bg-card rounded w-full" />
            <div className="h-4 bg-card rounded w-full" />
          </div>
        </Container>
      </div>
    )
  }

  if (error || !article) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error || 'Article not found'}</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Container>
    )
  }

  return (
    <div>
      <SEO
        title={article.title}
        description={article.excerpt || article.content.substring(0, 160)}
        image={article.coverImage}
        url={`/articles/${article.id}`}
        type="article"
        author={article.author.name}
        publishedDate={article.createdAt}
        modifiedDate={article.updatedAt}
      />

      {/* Cover Image */}
      <div
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${article.coverImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Article Content */}
      <Section padding="lg">
        <Container size="sm">
          <article className="animate-fade-in">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant={categoryColors[article.category] as any}
                  size="md"
                >
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">{article.readTime} min read</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {article.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center justify-between py-6 border-t border-b border-border">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={article.author.avatar}
                    alt={article.author.name}
                    size="lg"
                    fallback={article.author.name.charAt(0)}
                  />
                  <div>
                    <p className="font-semibold text-foreground">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none mb-12">
              <div
                className="text-muted-foreground leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="py-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="secondary" size="sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 flex gap-4">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                ← Back
              </Button>
              <Link to={`/${article.category}`}>
                <Button variant="ghost">
                  View more {article.category} articles →
                </Button>
              </Link>
            </div>
          </article>
        </Container>
      </Section>

      {/* Comments Section */}
      <Section padding="lg" className="bg-card/30">
        <Container size="sm">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Comments</h2>
            <p className="text-muted-foreground">Join the discussion</p>
          </div>

          {/* Comment Form */}
          <div className="mb-12">
            <CommentForm
              onSubmit={handleCreateComment}
              replyingTo={replyingTo || undefined}
              onCancelReply={() => setReplyingTo(null)}
            />
          </div>

          {/* Comments List */}
          {editingId ? (
            <CommentEditor
              initialContent={editingContent}
              onSave={handleEditComment}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <CommentList
              comments={comments}
              onReply={(parentId, parentAuthor) => setReplyingTo({ id: parentId, author: parentAuthor })}
              onEdit={(commentId, content) => {
                setEditingId(commentId)
                setEditingContent(content)
              }}
              onDelete={handleDeleteComment}
              isLoading={commentsLoading}
            />
          )}
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section
          title="Related Articles"
          subtitle="You might also like these"
          padding="lg"
          className="bg-card/30"
        >
          <Container>
            <ArticleGrid articles={relatedArticles} variant="grid" />
          </Container>
        </Section>
      )}
    </div>
  )
}
