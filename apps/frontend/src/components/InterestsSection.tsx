import { Link } from 'react-router-dom'
import { Interest } from '@/data/mockProfile'
import Card from './Card'

interface InterestsSectionProps {
  interests: Interest[]
  isLoading?: boolean
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="card-base h-48 animate-pulse" />
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
          className="group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Card hoverable className="h-full flex flex-col items-center justify-center text-center p-6 animate-fade-in">
            {/* Icon */}
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-base">
              {interest.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
              {interest.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {interest.description}
            </p>

            {/* Arrow */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-base">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default InterestsSection
