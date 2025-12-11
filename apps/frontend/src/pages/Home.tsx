export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
        <p className="text-lg text-muted-foreground">
          Hi, I'm a passionate developer and content creator. I share my thoughts on AI, travel experiences, photography, and history.
        </p>
      </section>

      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">About Me</h2>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>
            I'm interested in exploring the intersection of technology and human experience. Through this website, I share my journey and insights.
          </p>
          <p>
            Whether it's discussing the latest AI developments, sharing travel stories, showcasing photography, or exploring historical topics, I aim to provide thoughtful and engaging content.
          </p>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'AI Articles',
              description: 'Exploring artificial intelligence and machine learning',
              href: '/articles',
            },
            {
              title: 'Travel',
              description: 'Adventures and insights from around the world',
              href: '/travel',
            },
            {
              title: 'Photography',
              description: 'Visual stories and photography techniques',
              href: '/photography',
            },
            {
              title: 'History',
              description: 'Historical insights and perspectives',
              href: '/history',
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="p-6 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
