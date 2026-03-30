import { useProfile } from '@/hooks/useProfile'
import { useArticles } from '@/hooks/useArticles'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import InterestsSection from '@/components/InterestsSection'
import SEO from '@/components/SEO'

export default function Home() {
  const { profile, interests, isLoading: profileLoading } = useProfile()
  const { articles, isLoading: articlesLoading } = useArticles({ limit: 3 })

  if (profileLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-80 bg-muted" />
      </div>
    )
  }

  if (!profile) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load profile</p>
        </div>
      </Container>
    )
  }

  return (
    <div>
      <SEO
        title="Personal"
        description="A personal website showcasing thoughts on AI, travel, photography, and history."
        url="/"
        type="website"
      />

      {/* Hero — gradient fades into unified page background, no dividers */}
      <Hero profile={profile} />

      {/* Latest Articles */}
      <Section
        title="Latest Articles"
        subtitle="Explore my recent thoughts and insights"
        padding="lg"
      >
        <Container>
          <ArticleGrid articles={articles} isLoading={articlesLoading} />
        </Container>
      </Section>

      {/* Interests */}
      <Section
        title="Interests & Hobbies"
        subtitle="Discover what I'm passionate about"
        padding="lg"
      >
        <Container>
          <InterestsSection interests={interests} isLoading={profileLoading} />
        </Container>
      </Section>

      {/* About Me */}
      <Section title="About Me" padding="lg">
        <Container size="sm">
          <div className="card-base p-8 sm:p-10 space-y-5 reveal" style={{ transitionDelay: '80ms' }}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm passionate about exploring the intersection of technology and human experience. Through this website, I share my journey and insights across multiple domains.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Whether it's discussing the latest AI developments, sharing travel stories, showcasing photography, or exploring historical topics, I aim to provide thoughtful and engaging content that inspires and educates.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Feel free to explore my content, connect with me on social media, or reach out if you'd like to collaborate or discuss any topics that interest you.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
