'use client'

import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/theme-context'
import { type Accent, type ButtonVariant, type ButtonSize } from './types'

interface ButtonProps {
  variant?: ButtonVariant
  accent?: Accent
  size?: ButtonSize
  href?: string
  external?: boolean
  className?: string
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  gradient?: string
}

type ColorTriple = [bg: string, text: string, hoverBg: string]

const primaryColors: Record<Accent, { light: ColorTriple; dark: ColorTriple }> = {
  amber:   { light: ['#f59e0b', '#000000', '#fbbf24'], dark: ['#fbbf24', '#000000', '#fcd34d'] },
  indigo:  { light: ['#4f46e5', '#ffffff', '#4338ca'], dark: ['#818cf8', '#ffffff', '#a5b4fc'] },
  green:   { light: ['#10b981', '#000000', '#34d399'], dark: ['#34d399', '#000000', '#6ee7b7'] },
  neutral: { light: ['#111827', '#ffffff', '#374151'], dark: ['#ffffff', '#000000', 'rgba(255,255,255,0.9)'] },
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-4 text-sm',
  lg: 'px-10 py-5 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 font-headline font-bold rounded-full tracking-wide transition-all duration-300 active:scale-[0.97] select-none'

export function Button({
  variant = 'primary',
  accent = 'neutral',
  size = 'md',
  href,
  external = false,
  className,
  children,
  onClick,
  type = 'button',
  gradient,
}: ButtonProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const classes = cn(base, sizeMap[size], className)

  let inlineStyle: React.CSSProperties = {}

  if (gradient) {
    inlineStyle = { backgroundImage: gradient }
  } else if (variant === 'primary') {
    const [bg, text] = primaryColors[accent][isDark ? 'dark' : 'light']
    inlineStyle = { backgroundColor: bg, color: text }
  } else if (variant === 'secondary') {
    inlineStyle = isDark
      ? { borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }
      : { borderWidth: 1, borderStyle: 'solid', borderColor: '#d1d5db', color: '#6b7280' }
  } else {
    inlineStyle = { color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280' }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    if (gradient) return
    if (variant === 'primary') {
      const [,, hoverBg] = primaryColors[accent][isDark ? 'dark' : 'light']
      el.style.backgroundColor = hoverBg
    } else if (variant === 'secondary') {
      el.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : '#6b7280'
      el.style.color = isDark ? '#ffffff' : '#111827'
    } else {
      el.style.color = isDark ? '#ffffff' : '#111827'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    if (gradient) return
    if (variant === 'primary') {
      const [bg] = primaryColors[accent][isDark ? 'dark' : 'light']
      el.style.backgroundColor = bg
    } else if (variant === 'secondary') {
      el.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : '#d1d5db'
      el.style.color = isDark ? 'rgba(255,255,255,0.6)' : '#6b7280'
    } else {
      el.style.color = isDark ? 'rgba(255,255,255,0.5)' : '#6b7280'
    }
  }

  const sharedProps = {
    className: classes,
    style: inlineStyle,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} {...sharedProps}>
      {children}
    </button>
  )
}
