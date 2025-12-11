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
      {/* Background Image */}
      <div
        className="absolute inset-0 h-64 sm:h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url(${profile.backgroundImage})`,
          filter: 'brightness(0.6)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 pt-20 pb-12 sm:pt-32 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center animate-fade-in">
            {/* Avatar */}
            <div className="mb-6 ring-4 ring-accent/30 rounded-full">
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                size="2xl"
                fallback={profile.name.charAt(0)}
              />
            </div>

            {/* Name and Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2 animate-slide-up">
              {profile.name}
            </h1>
            <p className="text-xl sm:text-2xl text-accent mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
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
            <div className="mt-6 flex items-center gap-2 text-muted-foreground animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </div>
  )
}

export default Hero
