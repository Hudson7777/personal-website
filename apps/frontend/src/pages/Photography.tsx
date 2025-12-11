import { useArticles } from '@/hooks/useArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'

export default function Photography() {
  const { articles, isLoading } = useArticles({ category: 'photography' })

  return (
    <div>
      <SEO
        title="Photography"
        description="Visual stories and photography techniques. Discover photography insights and visual narratives."
        url="/photography"
        type="website"
      />

      <Section
        title="Photography"
        subtitle="Visual stories and photography techniques"
        padding="lg"
      >
        <Container>
          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage="No photography content yet. Check back soon!"
          />
        </Container>
      </Section>
    </div>
  )
}
