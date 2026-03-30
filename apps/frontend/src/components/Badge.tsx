import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants: Record<BadgeVariant, string> = {
      primary: 'bg-accent/10 text-accent border border-accent/20',
      secondary: 'bg-muted text-muted-foreground border border-border',
      success: 'bg-mist-100 text-mist-500 border border-mist-200',
      warning: 'bg-apricot-100 text-apricot-400 border border-apricot-200',
      error: 'bg-lavender-100 text-lavender-400 border border-lavender-200',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors duration-base',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
