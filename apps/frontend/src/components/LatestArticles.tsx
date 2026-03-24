import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from '@/data/mockArticles'
import Card, { CardBody } from './Card'
import Badge from './Badge'

const categoryBadgeVariant: Record<string, string> = {
  ai:          'primary',
  travel:      'success',
  photography: 'warning',
  history:     'error',
}

interface LatestArticlesProps {
  articles: Article[]
  isLoading?: boolean
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ articles, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton h-64" />
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => {
        const badgeVariant = categoryBadgeVariant[article.category] ?? 'secondary'

        return (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="group reveal-scale"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* card-left-bar: sage line slides from 0 → 100% on hover */}
            <Card hoverable className="h-full flex flex-col overflow-hidden card-left-bar">
              {/* Cover Image */}
              <div className="relative h-44 overflow-hidden bg-muted">
                {article.coverImage && (
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                    loading="lazy"
                  />
                )}
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

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  {article.readTime != null && <span>{article.readTime} min read</span>}
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export default LatestArticles
