import { useArticles } from '@/hooks/useArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'

export default function History() {
  const { articles, isLoading } = useArticles({ category: 'history' })

  return (
    <div>
      <SEO
        title="History"
        description="Historical insights and perspectives. Explore historical topics and narratives."
        url="/history"
        type="website"
      />

      <Section
        title="History"
        subtitle="Historical insights and perspectives"
        padding="lg"
      >
        <Container>
          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage="No history content yet. Check back soon!"
          />
        </Container>
      </Section>
    </div>
  )
}
