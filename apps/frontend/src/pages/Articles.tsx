import { useArticles } from '@/hooks/useArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'

export default function Articles() {
  const { articles, isLoading } = useArticles({ category: 'ai' })

  return (
    <div>
      <SEO
        title="AI Articles"
        description="Exploring artificial intelligence and machine learning. Discover insights and thoughts on AI developments."
        url="/articles"
        type="website"
      />

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
