'use client'

import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PauseButtonProps {
  paused: boolean
  onPausedChange: (paused: boolean) => void
  /** What it stops, e.g. "Pause the animations". Stays the same in both states; `aria-pressed` carries the state. */
  label: string
  className?: string
}

/**
 * Stops motion that keeps going on its own (WCAG 2.2.2). A round toggle: shows pause while things move, play once
 * stopped. Hidden without motion (`motion-only`), since there is nothing to stop then.
 */
export function PauseButton({ paused, onPausedChange, label, className }: PauseButtonProps) {
  const Icon = paused ? Play : Pause
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={label}
      title={label}
      onClick={() => onPausedChange(!paused)}
      className={cn(
        'motion-only inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
        'bg-foreground/[0.06] text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.1]',
        'aria-pressed:bg-foreground aria-pressed:text-background motion-reduce:transition-none',
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </button>
  )
}
