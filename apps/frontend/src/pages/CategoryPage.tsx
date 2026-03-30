import { useArticles } from '@/hooks/useArticles'
import { ArticleCategory } from '@/data/mockArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'

interface CategoryPageProps {
  category: ArticleCategory
  title: string
  subtitle: string
  seoDescription: string
  emptyMessage: string
}

export default function CategoryPage({
  category,
  title,
  subtitle,
  seoDescription,
  emptyMessage,
}: CategoryPageProps) {
  const { articles, isLoading } = useArticles({ category })

  return (
    <div>
      <SEO
        title={title}
        description={seoDescription}
        url={`/${category}`}
        type="website"
      />

      <Section title={title} subtitle={subtitle} padding="lg">
        <Container>
          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
        </Container>
      </Section>
    </div>
  )
}
