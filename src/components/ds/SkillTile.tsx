import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SkillTileProps {
  name: string;
  iconUrl: string;
  /** Fades the tile back when a filter excludes it. */
  dimmed?: boolean;
  className?: string;
}

/** A skill as a rounded tile: its logo on a white disc (logos are drawn for white), then its name. */
export function SkillTile({ name, iconUrl, dimmed = false, className }: SkillTileProps) {
  return (
    <li
      className={cn(
        'panel inline-flex shrink-0 items-center gap-3 rounded-full py-2 pl-2 pr-5 shadow-card',
        'transition-[opacity,transform,filter] duration-glide ease-glide motion-reduce:transition-none',
        dimmed && 'scale-95 opacity-25 grayscale',
        className,
      )}
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/[0.06]">
        {/* Remote SVG logos: served as-is, no optimizer round trip. */}
        <Image src={iconUrl} alt="" width={22} height={22} unoptimized className="h-[22px] w-[22px] object-contain" />
      </span>
      <span className="whitespace-nowrap text-[0.9375rem] font-medium text-foreground">{name}</span>
    </li>
  );
}
