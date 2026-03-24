import React from 'react'
import { Link } from 'react-router-dom'
import { Interest } from '@/data/mockProfile'

interface InterestsSectionProps {
  interests: Interest[]
  isLoading?: boolean
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton h-52" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {interests.map((interest, index) => (
        <Link
          key={interest.id}
          to={`/${interest.slug}`}
          className="group reveal-scale"
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          {/*
           * The card uses a CSS trick: we layer two backgrounds.
           * By default the gradient is invisible (opacity-0).
           * On hover, the gradient fades in and text transitions to white.
           */}
          <div className="relative h-full rounded-xl border border-border shadow-card overflow-hidden transition-all duration-slow hover:shadow-card-hover hover:-translate-y-1">
            {/* Gradient fill layer — animates in on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-100 transition-opacity duration-slow`}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-7 h-full bg-card group-hover:bg-transparent transition-colors duration-slow">
              {/* Icon */}
              <div className="text-5xl mb-4 transition-transform duration-slow group-hover:scale-110">
                {interest.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-white transition-colors duration-slow">
                {interest.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors duration-slow leading-relaxed">
                {interest.description}
              </p>

              {/* Arrow — slides in on hover */}
              <div className="mt-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-slow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default InterestsSection
