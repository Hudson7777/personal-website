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
          <div className="mb-8 sm:mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 animate-fade-in">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
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
