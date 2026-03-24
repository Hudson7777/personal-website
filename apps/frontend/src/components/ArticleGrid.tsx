import React from 'react'
import { Article } from '@/data/mockArticles'
import ArticleCard from './ArticleCard'
import Grid from './Grid'

interface ArticleGridProps {
  articles: Article[]
  isLoading?: boolean
  variant?: 'grid' | 'list'
  emptyMessage?: string
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  isLoading = false,
  variant = 'grid',
  emptyMessage = 'No articles found',
}) => {
  if (isLoading) {
    return (
      <Grid cols={variant === 'list' ? 1 : 3}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="skeleton h-64" />
        ))}
      </Grid>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="reveal"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <ArticleCard article={article} variant="list" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <Grid cols={3}>
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="reveal-scale"
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <ArticleCard article={article} variant="grid" />
        </div>
      ))}
    </Grid>
  )
}

export default ArticleGrid
