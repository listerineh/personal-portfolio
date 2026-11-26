import { cn } from "@/lib/utils";
import { CountUp } from "./CountUp";

export interface KeyFigure {
  /** As shown, e.g. "111 s", "~40", "0.13 USD". The leading number counts up once. */
  value: string;
  label: string;
}

interface KeyFiguresProps {
  figures: KeyFigure[];
  className?: string;
}

/**
 * A row of measured numbers, set large with nothing around them: the figure is the object. Two columns on
 * phones, up to four on desktop. Each number counts up the first time it scrolls in (CountUp keeps the final
 * value in the markup for screen readers, no-JS and reduced motion).
 */
/** "0.13 USD" → number "0.13" at full size, unit "USD" smaller beside it; "60–80%" stays whole. */
function FigureValue({ value }: { value: string }) {
  const match = value.match(/^(\S*\d\S*)\s+(\D+)$/);
  if (!match) return <CountUp value={value} />;
  return (
    <>
      <CountUp value={match[1]} />
      <span className="ml-[0.18em] text-[0.42em] font-semibold tracking-[-0.01em]">{match[2]}</span>
    </>
  );
}

export function KeyFigures({ figures, className }: KeyFiguresProps) {
  if (figures.length === 0) return null;
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-10",
        figures.length >= 4 ? "lg:grid-cols-4" : figures.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
        className,
      )}
    >
      {figures.map((figure) => (
        <div key={figure.label} className="flex flex-col">
          <dt className="order-last mt-2 max-w-[24ch] text-[0.9375rem] leading-snug text-muted-foreground">
            {figure.label}
          </dt>
          <dd className="whitespace-nowrap text-[clamp(2.25rem,5.2vw,3.75rem)] font-semibold leading-none tracking-[-0.045em] text-foreground">
            <FigureValue value={figure.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
