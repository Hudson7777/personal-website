import React from 'react'
import Avatar from './Avatar'
import SocialLinks, { SocialLink, socialIcons } from './SocialLinks'
import { Profile } from '@/data/mockProfile'

interface HeroProps {
  profile: Profile
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const socialLinks: SocialLink[] = profile.socialLinks.map(link => ({
    name: link.name,
    url: link.url,
    icon: socialIcons[link.icon as keyof typeof socialIcons] || socialIcons.github,
    label: link.name,
  }))

  return (
    <div className="relative overflow-hidden">
      {/* Background Image — Monet impressionist filter: brighten, desaturate, soft blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${profile.backgroundImage})`,
          filter: 'brightness(1.15) saturate(0.55) blur(1px)',
        }}
      />

      {/* Multi-layer warm gradient overlay — apricot top → transparent → page background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(245,230,211,0.55) 0%, rgba(245,247,245,0.25) 40%, rgba(245,247,245,0.85) 75%, #F5F7F5 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 pt-20 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center animate-fade-in">
            {/* Avatar — multi-layer shadow for impressionist halo effect */}
            <div
              className="mb-6 rounded-full animate-float"
              style={{
                boxShadow: '0 0 0 4px rgba(245,230,211,0.7), 0 0 0 7px rgba(139,168,136,0.2), 0 8px 32px rgba(28,43,30,0.14)',
              }}
            >
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                size="2xl"
                fallback={profile.name.charAt(0)}
              />
            </div>

            {/* Name — deep foreground color, Lora serif applied via global h1 rule */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-2 animate-slide-up">
              {profile.name}
            </h1>
            <p className="text-xl sm:text-2xl text-sage-500 mb-4 font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {profile.title}
            </p>

            {/* Bio */}
            <p className="max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {profile.bio}
            </p>

            {/* Social Links */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <SocialLinks
                links={socialLinks}
                iconClassName="w-7 h-7"
              />
            </div>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-sage-600 text-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade — insurance layer to merge with page background */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#F5F7F5] pointer-events-none" />
    </div>
  )
}

export default Hero
