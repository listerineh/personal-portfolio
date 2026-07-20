import { cn } from '@/lib/utils'
import { type Accent } from './types'
import { type ReactNode } from 'react'

interface SectionLabelProps {
  accent?: Accent
  animate?: boolean
  className?: string
  children: ReactNode
}

const colorMap: Record<Accent, string> = {
  amber:   'text-amber-700/60 dark:text-white/25',
  indigo:  'text-indigo-700/60 dark:text-white/25',
  green:   'text-emerald-700/65 dark:text-white/25',
  neutral: 'text-gray-400 dark:text-white/25',
}

export function SectionLabel({ accent = 'neutral', animate, className, children }: SectionLabelProps) {
  return (
    <p
      className={cn(
        animate && 'reveal-up',
        'font-headline text-[10px] tracking-[0.35em] uppercase',
        colorMap[accent],
        className,
      )}
    >
      {children}
    </p>
  )
}
