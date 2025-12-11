import { useArticles } from '@/hooks/useArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'

export default function Travel() {
  const { articles, isLoading } = useArticles({ category: 'travel' })

  return (
    <div>
      <Section
        title="Travel"
        subtitle="Adventures and insights from around the world"
        padding="lg"
      >
        <Container>
          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage="No travel stories yet. Check back soon!"
          />
        </Container>
      </Section>
    </div>
  )
}
