import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from '@/data/mockArticles'
import Card, { CardBody } from './Card'
import Badge from './Badge'
import Avatar from './Avatar'

interface ArticleCardProps {
  article: Article
  variant?: 'grid' | 'list'
}

const categoryBadgeVariant: Record<string, string> = {
  ai:          'primary',
  travel:      'success',
  photography: 'warning',
  history:     'error',
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'grid' }) => {
  const badgeVariant = categoryBadgeVariant[article.category] ?? 'secondary'

  if (variant === 'list') {
    return (
      <Link to={`/articles/${article.id}`} className="group">
        {/* card-left-bar: sage line slides from 0 → 100% on hover */}
        <Card hoverable className="overflow-hidden card-left-bar">
          <div className="flex gap-6 p-6">
            {/* Cover Image */}
            <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-muted">
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                  loading="lazy"
                />
              )}
            </div>

            {/* Content */}
            <CardBody className="flex-1 p-0">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={badgeVariant as any} size="sm">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Badge>
                {article.readTime != null && (
                  <span className="text-xs text-muted-foreground">{article.readTime} min</span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-base line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar
                    src={article.author.avatar ?? undefined}
                    alt={article.author.name}
                    size="sm"
                    fallback={article.author.name.charAt(0)}
                  />
                  <span className="text-sm text-muted-foreground">{article.author.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardBody>
          </div>
        </Card>
      </Link>
    )
  }

  // Grid variant
  return (
    <Link to={`/articles/${article.id}`} className="group">
      {/* card-left-bar: sage line slides from 0 → 100% on hover */}
      <Card hoverable className="h-full flex flex-col overflow-hidden card-left-bar">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
              loading="lazy"
            />
          )}
          {/* Subtle bottom-fade for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <CardBody className="flex-1 flex flex-col">
          <div className="mb-3">
            <Badge variant={badgeVariant as any} size="sm">
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-base">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar
                src={article.author.avatar ?? undefined}
                alt={article.author.name}
                size="sm"
                fallback={article.author.name.charAt(0)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {article.author.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {article.readTime != null && (
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {article.readTime}m
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

export default ArticleCard
