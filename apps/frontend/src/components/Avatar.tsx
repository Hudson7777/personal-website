import React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  fallback?: string
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size = 'md', fallback, alt, ...props }, ref) => {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
      '2xl': 'w-32 h-32',
    }

    const [imageError, setImageError] = React.useState(false)

    const handleError = () => {
      setImageError(true)
    }

    if (imageError || !props.src) {
      return (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/70 text-accent-foreground font-semibold',
            sizes[size],
            className
          )}
        >
          {fallback ? fallback.charAt(0).toUpperCase() : '?'}
        </div>
      )
    }

    return (
      <img
        ref={ref}
        alt={alt || 'Avatar'}
        className={cn(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
        onError={handleError}
        {...props}
      />
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
