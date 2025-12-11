import { useArticles } from '@/hooks/useArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'

export default function Photography() {
  const { articles, isLoading } = useArticles({ category: 'photography' })

  return (
    <div>
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
