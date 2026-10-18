import { cn } from '@/lib/utils';

interface EqualizerProps {
  bars?: number;
  className?: string;
  /** Bar color; defaults to amber. */
  color?: string;
}

// Fixed pseudo-random pattern so server and client render the same bars.
const SPEEDS = [0.9, 1.3, 0.7, 1.1, 1.5, 0.8, 1.2, 1.0, 1.4, 0.75, 1.15, 0.95];

/** Equalizer bars that dance out of step. Decorative; stands still without motion. */
export function Equalizer({ bars = 12, className, color }: EqualizerProps) {
  return (
    <span aria-hidden="true" className={cn('flex h-10 items-end gap-1', className)}>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="eq-bar block w-1.5 origin-bottom rounded-full"
          style={
            {
              height: `${40 + ((i * 37) % 60)}%`,
              backgroundColor: color ?? 'rgb(var(--primary))',
              '--eq-speed': `${SPEEDS[i % SPEEDS.length]}s`,
              '--eq-delay': `${-(i * 0.13).toFixed(2)}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
