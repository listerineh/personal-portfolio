import { cn } from '@/lib/utils'
import { type Accent } from './types'
import { type ReactNode } from 'react'

interface AccentCardProps {
  accent?: Accent
  animate?: boolean
  className?: string
  children: ReactNode
}

const cardMap: Record<Accent, string> = {
  amber:   '[border-color:var(--primary-border)] [background-color:var(--primary-bg)] hover:[background-color:var(--primary-bg-hover)]',
  indigo:  'border-indigo-500/25 bg-indigo-500/10 dark:border-indigo-400/20 dark:bg-indigo-400/10 hover:bg-indigo-400/15',
  green:   'border-emerald-500/25 bg-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-400/10 hover:bg-emerald-400/15',
  neutral: 'border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.03] hover:bg-white/[0.06]',
}

export function AccentCard({ accent = 'neutral', animate, className, children }: AccentCardProps) {
  return (
    <div
      className={cn(
        animate && 'reveal-up',
        'rounded-2xl border p-4 transition-colors duration-300',
        cardMap[accent],
        className,
      )}
    >
      {children}
    </div>
  )
}
