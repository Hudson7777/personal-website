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
  name: '浩然',
  title: 'Fullstack Software Engineer',
  bio: '本科计算机视觉，研究生人机交互，入职后前端转数据，被动实现了全栈梦想。对AI保持持续的热情，热爱历史人文、solo旅行、摄影和研究股市。',
  avatar: '/avatar.png',
  backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
  email: 'haoran7.xu@gmail.com',
  location: 'Beijing, China',
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/Hudson7777',
      icon: 'github',
    },
    {
      name: 'Email',
      url: 'mailto:haoran7.xu@gmail.com',
      icon: 'email',
    },
    {
      name: 'WeChat',
      url: 'weixin://Simple4Me',
      icon: 'wechat',
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
    color: 'from-mist-300 to-sage-400',
    slug: 'articles',
  },
  {
    id: '2',
    title: 'Travel',
    description: 'Adventures and insights from around the world',
    icon: '✈️',
    color: 'from-mist-200 to-lavender-300',
    slug: 'travel',
  },
  {
    id: '3',
    title: 'Photography',
    description: 'Visual stories and photography techniques',
    icon: '📸',
    color: 'from-lavender-200 to-apricot-300',
    slug: 'photography',
  },
  {
    id: '4',
    title: 'History',
    description: 'Historical insights and perspectives',
    icon: '📚',
    color: 'from-apricot-200 to-sage-300',
    slug: 'history',
  },
]
