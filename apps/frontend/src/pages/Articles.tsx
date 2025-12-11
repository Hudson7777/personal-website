import { useArticles } from '@/hooks/useArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'

export default function Articles() {
  const { articles, isLoading } = useArticles({ category: 'ai' })

  return (
    <div>
      <Section
        title="AI Articles"
        subtitle="Exploring artificial intelligence and machine learning"
        padding="lg"
      >
        <Container>
          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage="No AI articles yet. Check back soon!"
          />
        </Container>
      </Section>
    </div>
  )
}
