import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
  label?: string
}

interface SocialLinksProps {
  links: SocialLink[]
  className?: string
  iconClassName?: string
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  className,
  iconClassName = 'w-6 h-6',
}) => {
  const [wechatOpen, setWechatOpen] = useState(false)
  const wechatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wechatOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWechatOpen(false)
    }
    const handleClick = (e: MouseEvent) => {
      if (wechatRef.current && !wechatRef.current.contains(e.target as Node)) {
        setWechatOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [wechatOpen])

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {links.map((link) => {
        if (link.name === 'WeChat') {
          return (
            <div key={link.name} className="relative" ref={wechatRef}>
              <button
                onClick={() => setWechatOpen(prev => !prev)}
                aria-label="WeChat"
                title="WeChat: Simple4Me"
                className="text-muted-foreground hover:text-accent transition-colors duration-base hover-lift"
              >
                <div className={iconClassName}>
                  {link.icon}
                </div>
              </button>

              {wechatOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50
                                bg-white rounded-2xl shadow-lg border border-border p-4
                                flex flex-col items-center gap-2 w-44">
                  {/* Arrow pointing down */}
                  <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2
                                  w-4 h-4 bg-white border-r border-b border-border rotate-45" />
                  <img
                    src="/wechat-qr.png"
                    alt="WeChat QR Code"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <p className="text-xs text-muted-foreground font-medium tracking-wide">
                    Simple4Me
                  </p>
                </div>
              )}
            </div>
          )
        }

        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label || link.name}
            className="text-muted-foreground hover:text-accent transition-colors duration-base hover-lift"
            title={link.name}
          >
            <div className={iconClassName}>
              {link.icon}
            </div>
          </a>
        )
      })}
    </div>
  )
}

// Predefined social icons
export const socialIcons = {
  github: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  twitter: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9.5 5M9 19c1 0 1-1 1-1" />
    </svg>
  ),
  linkedin: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  email: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  wechat: (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-3.898-6.348-7.601-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-3.74 2.633c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm5.4 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/>
    </svg>
  ),
  instagram: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
}

export default SocialLinks
