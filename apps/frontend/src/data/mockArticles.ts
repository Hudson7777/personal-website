/**
 * Mock Articles Data
 * Replace with real data from API later
 */

export type ArticleCategory = 'ai' | 'travel' | 'photography' | 'history'

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: ArticleCategory
  tags: string[]
  coverImage: string
  author: {
    name: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
  readTime: number
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI: Opportunities and Challenges',
    excerpt: 'Exploring the transformative potential of artificial intelligence and the challenges we need to address.',
    content: `
# The Future of AI: Opportunities and Challenges

Artificial Intelligence is reshaping our world in unprecedented ways. From healthcare to transportation, AI is revolutionizing how we work and live.

## Opportunities

1. **Healthcare Revolution**: AI can help diagnose diseases earlier and develop new treatments faster.
2. **Productivity Boost**: Automation of routine tasks frees humans to focus on creative work.
3. **Personalization**: AI enables highly personalized experiences across all platforms.

## Challenges

- **Ethical Concerns**: We need to ensure AI is developed responsibly.
- **Job Displacement**: We must prepare for workforce transitions.
- **Data Privacy**: Protecting user data is crucial.

The future of AI depends on how we address these challenges today.
    `,
    category: 'ai',
    tags: ['AI', 'Machine Learning', 'Future', 'Technology'],
    coverImage: 'https://images.unsplash.com/photo-1677442d019cecf8d5a594b4e1d0b5c5?w=800&h=400&fit=crop',
    author: {
      name: 'Hudson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Discovering Hidden Gems in Tokyo',
    excerpt: 'A journey through Tokyo\'s lesser-known neighborhoods and local experiences.',
    content: `
# Discovering Hidden Gems in Tokyo

Tokyo is a city of contrasts, where ancient traditions meet cutting-edge technology. Beyond the famous landmarks, there are countless hidden gems waiting to be discovered.

## Neighborhoods to Explore

### Shimokitazawa
A bohemian neighborhood filled with vintage shops, theaters, and cozy cafes.

### Yanaka
One of the few areas that survived WWII bombing, featuring traditional wooden houses and temples.

### Koenji
Known for its underground music scene and vintage fashion stores.

## Local Experiences

- Visit local izakayas for authentic Japanese cuisine
- Explore temple gardens at sunrise
- Take part in local festivals

Tokyo rewards those who venture off the beaten path.
    `,
    category: 'travel',
    tags: ['Travel', 'Japan', 'Tokyo', 'Adventure'],
    coverImage: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a0?w=800&h=400&fit=crop',
    author: {
      name: 'Hudson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    readTime: 6,
  },
  {
    id: '3',
    title: 'Mastering Landscape Photography',
    excerpt: 'Essential tips and techniques for capturing stunning landscape photographs.',
    content: `
# Mastering Landscape Photography

Landscape photography is about capturing the beauty of nature and telling stories through images.

## Essential Techniques

### Composition
- Use the rule of thirds
- Include foreground, middle ground, and background
- Look for leading lines

### Lighting
- Golden hour provides the best light
- Avoid harsh midday sun
- Experiment with backlighting

### Equipment
- A wide-angle lens is essential
- Use a tripod for stability
- Consider ND filters for long exposures

## Post-Processing

- Enhance colors subtly
- Adjust contrast and clarity
- Maintain natural appearance

Remember, the best camera is the one you have with you.
    `,
    category: 'photography',
    tags: ['Photography', 'Landscape', 'Tips', 'Techniques'],
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    author: {
      name: 'Hudson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    readTime: 7,
  },
  {
    id: '4',
    title: 'The Renaissance: A Rebirth of Human Potential',
    excerpt: 'Understanding the transformative period that shaped modern civilization.',
    content: `
# The Renaissance: A Rebirth of Human Potential

The Renaissance was a period of extraordinary human achievement that transformed European civilization.

## Key Characteristics

### Humanism
- Focus on human potential and achievement
- Revival of classical Greek and Roman texts
- Emphasis on individual expression

### Artistic Innovation
- Development of perspective in painting
- Anatomical accuracy in sculpture
- New architectural styles

### Scientific Progress
- Copernican revolution in astronomy
- Advances in mathematics and physics
- Improved navigation techniques

## Major Figures

- Leonardo da Vinci: Artist, scientist, inventor
- Michelangelo: Sculptor and painter
- Galileo: Astronomer and physicist

The Renaissance laid the foundation for the modern world.
    `,
    category: 'history',
    tags: ['History', 'Renaissance', 'Culture', 'Art'],
    coverImage: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=400&fit=crop',
    author: {
      name: 'Hudson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    readTime: 8,
  },
]

export const getArticlesByCategory = (category: ArticleCategory): Article[] => {
  return mockArticles.filter(article => article.category === category)
}

export const getArticleById = (id: string): Article | undefined => {
  return mockArticles.find(article => article.id === id)
}

export const getLatestArticles = (limit: number = 3): Article[] => {
  return mockArticles.slice(0, limit)
}

export const getRelatedArticles = (articleId: string, limit: number = 3): Article[] => {
  const article = getArticleById(articleId)
  if (!article) return []

  return mockArticles
    .filter(a => a.id !== articleId && a.category === article.category)
    .slice(0, limit)
}
