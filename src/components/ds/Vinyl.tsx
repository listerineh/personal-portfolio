import { cn } from '@/lib/utils';

interface VinylProps {
  /** Label color: the project's identity. */
  color: string;
  /** Spin slowly (faster on hover of a parent `.group`). Stops without motion. */
  spinning?: boolean;
  className?: string;
}

/** A vinyl record drawn in CSS: grooves, a colored label, the spindle hole. Decorative. */
export function Vinyl({ color, spinning = true, className }: VinylProps) {
  return (
    <span aria-hidden="true" className={cn('relative block aspect-square rounded-full shadow-float', className)}>
      <span
        className={cn('absolute inset-0 rounded-full', spinning && 'vinyl-spin')}
        style={{
          background:
            'repeating-radial-gradient(circle at 50% 50%, #0d0d0e 0px, #0d0d0e 2px, #18181a 3px, #0d0d0e 4px), radial-gradient(circle at 30% 25%, rgba(255,255,255,0.14), transparent 45%)',
        }}
      >
        {/* A sheen that rotates with the record so the spin reads. */}
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: 'conic-gradient(from 20deg, transparent 0 18%, rgba(255,255,255,0.07) 22%, transparent 28% 68%, rgba(255,255,255,0.05) 72%, transparent 78%)' }}
        />
        <span className="absolute inset-[34%] rounded-full" style={{ backgroundColor: color }}>
          <span className="absolute inset-[18%] rounded-full border border-black/15" />
        </span>
        <span className="absolute left-1/2 top-1/2 h-[5%] w-[5%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d0d0e]" />
      </span>
    </span>
  );
}
