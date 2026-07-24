import { cn } from '@/lib/utils'
import { type Accent, type TextSize, type TextStrength } from './types'
import { type ElementType, type ReactNode } from 'react'

interface TextProps {
  as?: ElementType
  size?: TextSize
  strength?: TextStrength
  accent?: Accent
  animate?: boolean
  className?: string
  children: ReactNode
}

const sizeMap: Record<TextSize, string> = {
  xs:   'text-xs',
  sm:   'text-sm',
  base: 'text-base',
  lg:   'text-lg',
  xl:   'text-xl',
}

const colorMap: Record<TextStrength, Record<Accent, string>> = {
  primary: {
    amber:   'text-foreground/75 dark:text-white/75',
    indigo:  'text-indigo-950/75 dark:text-white/70',
    green:   'text-emerald-950/75 dark:text-white/65',
    neutral: 'text-gray-700 dark:text-white/75',
  },
  secondary: {
    amber:   'text-foreground/55 dark:text-white/50',
    indigo:  'text-indigo-900/55 dark:text-white/45',
    green:   'text-emerald-900/55 dark:text-white/50',
    neutral: 'text-gray-500 dark:text-white/50',
  },
  accent: {
    amber:   'text-primary dark:text-primary/50',
    indigo:  'text-indigo-600 dark:text-indigo-400/50',
    green:   'text-emerald-600 dark:text-emerald-400/50',
    neutral: 'text-gray-600 dark:text-white/40',
  },
  muted: {
    amber:   'text-primary/40 dark:text-foreground/30',
    indigo:  'text-indigo-700/40 dark:text-white/30',
    green:   'text-emerald-700/40 dark:text-white/30',
    neutral: 'text-gray-400 dark:text-white/30',
  },
}

export function Text({
  as: Tag = 'p',
  size = 'base',
  strength = 'primary',
  accent = 'neutral',
  animate,
  className,
  children,
}: TextProps) {
  return (
    <Tag
      className={cn(
        animate && 'reveal-up',
        'leading-relaxed',
        sizeMap[size],
        colorMap[strength][accent],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
