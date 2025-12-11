import { useProfile } from '@/hooks/useProfile'
import { useArticles } from '@/hooks/useArticles'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Container from '@/components/Container'
import LatestArticles from '@/components/LatestArticles'
import InterestsSection from '@/components/InterestsSection'
import SEO from '@/components/SEO'

export default function Home() {
  const { profile, interests, isLoading: profileLoading } = useProfile()
  const { articles, isLoading: articlesLoading } = useArticles({ limit: 3 })

  if (profileLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-80 bg-card" />
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
        description="A personal website showcasing thoughts on AI, travel, photography, and history. Explore my journey and insights across multiple domains."
        url="/"
        type="website"
      />

      {/* Hero Section */}
      <Hero profile={profile} />

      {/* Latest Articles Section */}
      <Section
        title="Latest Articles"
        subtitle="Explore my recent thoughts and insights"
        padding="lg"
      >
        <Container>
          <LatestArticles articles={articles} isLoading={articlesLoading} />
        </Container>
      </Section>

      {/* Interests Section */}
      <Section
        title="Interests & Hobbies"
        subtitle="Discover what I'm passionate about"
        padding="lg"
        className="bg-card/30"
      >
        <Container>
          <InterestsSection interests={interests} isLoading={profileLoading} />
        </Container>
      </Section>

      {/* About Section */}
      <Section
        title="About Me"
        subtitle="Get to know me better"
        padding="lg"
      >
        <Container size="sm">
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed animate-fade-in">
              I'm passionate about exploring the intersection of technology and human experience. Through this website, I share my journey and insights across multiple domains.
            </p>
            <p className="text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Whether it's discussing the latest AI developments, sharing travel stories, showcasing photography, or exploring historical topics, I aim to provide thoughtful and engaging content that inspires and educates.
            </p>
            <p className="text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Feel free to explore my content, connect with me on social media, or reach out if you'd like to collaborate or discuss any topics that interest you.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
