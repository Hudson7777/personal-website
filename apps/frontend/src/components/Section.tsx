import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  title?: string
  subtitle?: string
  padding?: 'sm' | 'md' | 'lg'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, title, subtitle, padding = 'md', children, ...props }, ref) => {
    const paddingClasses = {
      sm: 'py-8 sm:py-10',
      md: 'py-12 sm:py-16',
      lg: 'py-16 sm:py-20 lg:py-24',
    }

    return (
      <section
        ref={ref}
        className={cn(paddingClasses[padding], className)}
        {...props}
      >
        {(title || subtitle) && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
            {title && (
              <div className="reveal flex items-center gap-0 mb-1">
                {/* Small sage square — slides in from left slightly before title */}
                <span
                  className="section-sq-mark reveal-left"
                  style={{ transitionDelay: '0ms' }}
                />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {title}
                </h2>
              </div>
            )}
            {subtitle && (
              <p
                className="text-lg text-muted-foreground mt-3 reveal"
                style={{ transitionDelay: '100ms' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section
