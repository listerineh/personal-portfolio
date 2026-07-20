import { cn } from '@/lib/utils'
import { type Accent } from './types'

type PillVariant = 'solid' | 'outline'

interface PillProps {
  variant?: PillVariant
  accent?: Accent
  color?: string
  className?: string
  children: React.ReactNode
}

const solidMap: Record<Accent, string> = {
  amber:   'bg-amber-500/15 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400',
  indigo:  'bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400',
  green:   'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400',
  neutral: 'bg-gray-500/10 text-gray-600 dark:bg-white/10 dark:text-white/60',
}

const outlineMap: Record<Accent, string> = {
  amber:   'border border-amber-500/30 text-amber-600/75 dark:border-amber-400/20 dark:text-amber-400/50',
  indigo:  'border border-indigo-500/30 text-indigo-600/75 dark:border-indigo-400/20 dark:text-indigo-400/50',
  green:   'border border-emerald-500/30 text-emerald-600/75 dark:border-emerald-400/20 dark:text-emerald-400/50',
  neutral: 'border border-gray-300 text-gray-500 dark:border-white/15 dark:text-white/50',
}

export function Pill({ variant = 'solid', accent = 'neutral', color, className, children }: PillProps) {
  const base = 'inline-block px-3 py-1 rounded-full text-[10px] font-headline font-semibold tracking-[0.25em] uppercase'

  if (color) {
    const inlineStyle: React.CSSProperties =
      variant === 'outline'
        ? { borderWidth: 1, borderStyle: 'solid', borderColor: `${color}66`, color: `${color}bf` }
        : { backgroundColor: `${color}1a`, color }
    return (
      <span className={cn(base, className)} style={inlineStyle}>
        {children}
      </span>
    )
  }

  const colorClass = variant === 'solid' ? solidMap[accent] : outlineMap[accent]
  return (
    <span className={cn(base, colorClass, className)}>
      {children}
    </span>
  )
}
