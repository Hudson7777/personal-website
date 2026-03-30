import { useState } from 'react'
import { useArticles } from '@/hooks/useArticles'
import { ArticleCategory } from '@/data/mockArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'
import { cn } from '@/lib/utils'

type FilterCategory = ArticleCategory | 'all'

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  all: 'All',
  ai: 'AI',
  travel: 'Travel',
  photography: 'Photography',
  history: 'History',
}

const FILTER_TABS: FilterCategory[] = ['all', 'ai', 'travel', 'photography', 'history']

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')

  const { articles, isLoading } = useArticles(
    activeCategory === 'all' ? undefined : { category: activeCategory as ArticleCategory }
  )

  return (
    <div>
      <SEO
        title="Articles"
        description="Thoughts and insights on AI, travel, photography, and history."
        url="/articles"
        type="website"
      />

      <Section
        title="Articles"
        subtitle="Thoughts and insights across topics I care about"
        padding="lg"
      >
        <Container>
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTER_TABS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-base',
                  activeCategory === cat
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage={`No ${activeCategory === 'all' ? '' : CATEGORY_LABELS[activeCategory] + ' '}articles yet. Check back soon!`}
          />
        </Container>
      </Section>
    </div>
  )
}
