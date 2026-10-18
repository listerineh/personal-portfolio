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
        'inline-flex min-h-9 items-center rounded-full px-3.5 text-[0.8125rem] font-medium',
        'transition-[background-color,color,transform] duration-snap ease-snap active:scale-95 motion-reduce:transition-none',
        pressed
          ? 'bg-foreground text-surface'
          : 'bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.1]',
        className,
      )}
    >
      {children}
    </button>
  )
}
