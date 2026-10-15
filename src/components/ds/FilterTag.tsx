'use client'

import { cn } from '@/lib/utils'

interface FilterTagProps {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
  children: React.ReactNode
  className?: string
}

/** A catalog tag that filters: ruled when off, solid ink when on. Announced as a toggle. */
export function FilterTag({ pressed, onPressedChange, children, className }: FilterTagProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        'inline-flex min-h-10 items-center border px-3 font-mono text-xs font-medium transition-[background-color,color,border-color] duration-snap ease-snap',
        pressed
          ? 'border-foreground bg-foreground text-surface'
          : 'border-foreground/30 text-foreground hover:border-foreground',
        className,
      )}
    >
      {children}
    </button>
  )
}
