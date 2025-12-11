import { useParams, Link, useNavigate } from 'react-router-dom'
import { useArticle } from '@/hooks/useArticle'
import { getRelatedArticles } from '@/data/mockArticles'
import Container from '@/components/Container'
import Section from '@/components/Section'
import Avatar from '@/components/Avatar'
import Badge from '@/components/Badge'
import ArticleGrid from '@/components/ArticleGrid'
import Button from '@/components/Button'

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { article, isLoading, error } = useArticle(id)
  const relatedArticles = article ? getRelatedArticles(article.id, 3) : []

  const categoryColors: Record<string, string> = {
    ai: 'primary',
    travel: 'success',
    photography: 'warning',
    history: 'error',
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
