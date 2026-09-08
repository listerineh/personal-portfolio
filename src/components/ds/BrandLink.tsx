'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BrandLinkProps {
  href: string
  color: string
  variant?: 'solid' | 'outline'
  className?: string
  children: ReactNode
}

const base =
  'inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full text-sm transition-[filter,background-color,border-color,color,transform] duration-300 ease-out active:scale-[0.97]'

export function BrandLink({
  href,
  color,
  variant = 'outline',
  className,
  children,
}: BrandLinkProps) {
  if (variant === 'solid') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, 'text-black', className)}
        style={{ backgroundColor: color }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, className)}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: `${color}40`,
        color,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = `${color}1a`
        e.currentTarget.style.borderColor = `${color}80`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.borderColor = `${color}40`
      }}
    >
      {children}
    </a>
  )
}
