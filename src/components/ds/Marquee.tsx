import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  /** List items (`<li>`); rendered twice back to back so the loop is seamless. */
  children: ReactNode;
  /** Run right-to-left (default) or left-to-right. */
  reverse?: boolean;
  /** Seconds for one full pass; longer lists want longer durations so the speed feels the same. */
  duration?: number;
  /** Freeze the row (e.g. while a filter is active). Hover also pauses it. */
  paused?: boolean;
  /** Accessible name of the list. */
  label?: string;
  className?: string;
}

/**
 * An endless row that drifts sideways, with edges that fade out. The second copy exists only to close the loop and is
 * hidden from assistive tech. Without motion (no JS or reduced motion) the row stands still and scrolls by hand.
 */
export function Marquee({ children, reverse = false, duration = 60, paused = false, label, className }: MarqueeProps) {
  return (
    <div className={cn('marquee', className)} data-paused={paused ? '' : undefined}>
      <div
        className="marquee-track"
        data-reverse={reverse ? '' : undefined}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <ul aria-label={label} className="flex shrink-0 items-center gap-3 py-3 pr-3">
          {children}
        </ul>
        <ul aria-hidden="true" className="marquee-copy flex shrink-0 items-center gap-3 py-3 pr-3">
          {children}
        </ul>
      </div>
    </div>
  );
}
