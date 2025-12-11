/**
 * Mock Profile Data
 * Replace with real data from API later
 */

export interface Profile {
  name: string
  title: string
  bio: string
  avatar: string
  backgroundImage: string
  email: string
  location: string
  socialLinks: Array<{
    name: string
    url: string
    icon: string
  }>
}

export const mockProfile: Profile = {
  name: 'Hudson',
  title: 'Full Stack Developer & Content Creator',
  bio: 'Passionate about exploring the intersection of technology and human experience. I share insights on AI, travel, photography, and history.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
  email: 'hello@example.com',
  location: 'San Francisco, CA',
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'linkedin',
    },
    {
      name: 'Email',
      url: 'mailto:hello@example.com',
      icon: 'email',
    },
  ],
}

export interface Interest {
  id: string
  title: string
  description: string
  icon: string
  color: string
  slug: string
}

export const mockInterests: Interest[] = [
  {
    id: '1',
    title: 'AI Articles',
    description: 'Exploring artificial intelligence and machine learning',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
    slug: 'articles',
  },
  {
    id: '2',
    title: 'Travel',
    description: 'Adventures and insights from around the world',
    icon: '✈️',
    color: 'from-green-500 to-emerald-500',
    slug: 'travel',
  },
  {
    id: '3',
    title: 'Photography',
    description: 'Visual stories and photography techniques',
    icon: '📸',
    color: 'from-purple-500 to-pink-500',
    slug: 'photography',
  },
  {
    id: '4',
    title: 'History',
    description: 'Historical insights and perspectives',
    icon: '📚',
    color: 'from-amber-500 to-orange-500',
    slug: 'history',
  },
]
