import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from '@/data/mockArticles'
import Card, { CardBody } from './Card'
import Badge from './Badge'

interface LatestArticlesProps {
  articles: Article[]
  isLoading?: boolean
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ articles, isLoading = false }) => {
  const categoryColors: Record<string, string> = {
    ai: 'primary',
    travel: 'success',
    photography: 'warning',
    history: 'error',
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="card-base h-64 animate-pulse" />
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
      {articles.map((article, index) => (
        <Link
          key={article.id}
          to={`/articles/${article.id}`}
          className="group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Card hoverable className="h-full flex flex-col overflow-hidden animate-fade-in">
            {/* Cover Image */}
            <div className="relative h-40 overflow-hidden bg-card">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-base"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Content */}
            <CardBody className="flex-1 flex flex-col">
              {/* Category Badge */}
              <div className="mb-3">
                <Badge
                  variant={categoryColors[article.category] as any}
                  size="sm"
                >
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <span>{article.readTime} min read</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default LatestArticles
