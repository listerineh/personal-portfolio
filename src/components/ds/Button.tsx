'use client'

import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
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
  disabled?: boolean
}

const accentMap: Record<Accent, { primary: string; secondary: string; ghost: string }> = {
  amber: {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'border border-primary/30 text-primary hover:bg-primary/[0.08] hover:border-primary/50',
    ghost: 'text-primary hover:bg-primary/[0.08]',
  },
  indigo: {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-400',
    secondary: 'border border-indigo-400/30 text-indigo-400 hover:bg-indigo-400/10 hover:border-indigo-400/50',
    ghost: 'text-indigo-400 hover:bg-indigo-400/10',
  },
  green: {
    primary: 'bg-green-500 text-black hover:bg-green-400',
    secondary: 'border border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500/50',
    ghost: 'text-green-500 hover:bg-green-500/10',
  },
  neutral: {
    primary: 'bg-foreground text-background hover:bg-foreground/90',
    secondary: 'border border-foreground/15 text-foreground/70 hover:text-foreground hover:border-foreground/30',
    ghost: 'text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]',
  },
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-4 text-sm',
  lg: 'px-10 py-5 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 font-headline font-bold rounded-full tracking-wide transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100 select-none disabled:opacity-50 disabled:cursor-not-allowed'

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
  disabled = false,
}: ButtonProps) {
  const classes = cn(base, sizeMap[size], accentMap[accent][variant], className)

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
