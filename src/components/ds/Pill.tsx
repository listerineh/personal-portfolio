import { cn } from '@/lib/utils'
import { type Accent } from './types'

type PillVariant = 'solid' | 'outline'

type PillSize = 'sm' | 'md'

interface PillProps {
  variant?: PillVariant
  accent?: Accent
  color?: string
  size?: PillSize
  shape?: 'pill' | 'rect'
  uppercase?: boolean
  className?: string
  children: React.ReactNode
}

const solidMap: Record<Accent, string> = {
  amber:   'bg-primary/15 text-primary dark:bg-primary/10 dark:text-primary',
  indigo:  'bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400',
  green:   'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400',
  neutral: 'bg-gray-500/10 text-gray-600 dark:bg-white/10 dark:text-white/60',
}

const outlineMap: Record<Accent, string> = {
  amber:   'border border-primary/30 text-primary/75 dark:border-primary/20 dark:text-primary/50',
  indigo:  'border border-indigo-500/30 text-indigo-600/75 dark:border-indigo-400/20 dark:text-indigo-400/50',
  green:   'border border-emerald-500/30 text-emerald-600/75 dark:border-emerald-400/20 dark:text-emerald-400/50',
  neutral: 'border border-gray-400/60 text-gray-600 dark:border-white/15 dark:text-white/50',
}

const sizeMap: Record<PillSize, string> = {
  md: 'px-3 py-1 text-[10px] tracking-[0.25em]',
  sm: 'px-2 py-0.5 text-[10px] tracking-wide',
}

export function Pill({ variant = 'solid', accent = 'neutral', color, size = 'md', shape = 'pill', uppercase = true, className, children }: PillProps) {
  const base = cn(
    'inline-flex items-center gap-1.5 font-headline font-semibold',
    shape === 'rect' ? 'rounded-md' : 'rounded-full',
    sizeMap[size],
    uppercase && 'uppercase',
  )

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
