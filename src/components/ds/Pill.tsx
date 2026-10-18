import { cn } from "@/lib/utils";
import { type Accent } from "./types";

type PillVariant = "solid" | "outline";

type PillSize = "sm" | "md";

interface PillProps {
  /** `solid` is a filled catalog tag; `outline` a ruled one. */
  variant?: PillVariant;
  /** `amber` = live (current, new, available). Legacy accents render as ink. */
  accent?: Accent;
  /** Brand color (hex) for music identities only. */
  color?: string;
  size?: PillSize;
  /** Kept for API compatibility; tags are always fully rounded. */
  shape?: "pill" | "rect";
  uppercase?: boolean;
  className?: string;
  children: React.ReactNode;
}

const toneMap: Record<PillVariant, { amber: string; ink: string }> = {
  solid: {
    amber: "bg-primary text-primary-foreground",
    ink: "bg-foreground/[0.07] text-foreground",
  },
  outline: {
    amber: "border border-primary/60 text-primary",
    ink: "border border-border text-muted-foreground",
  },
};

const sizeMap: Record<PillSize, string> = {
  md: "h-7 px-3 text-xs",
  sm: "h-6 px-2.5 text-[0.6875rem]",
};

/** Tag: a stack item, a status, a medium. Small, fully rounded. */
export function Pill({
  variant = "solid",
  accent = "neutral",
  color,
  size = "md",
  uppercase = false,
  className,
  children,
}: PillProps) {
  const base = cn(
    "inline-flex items-center gap-1.5 rounded-full font-medium leading-none whitespace-nowrap",
    sizeMap[size],
    uppercase && "uppercase tracking-[0.04em]",
  );

  if (color) {
    const style: React.CSSProperties =
      variant === "outline"
        ? { border: `1px solid ${color}`, color }
        : { backgroundColor: color, color: "#1D1D1F" };
    return (
      <span className={cn(base, className)} style={style}>
        {children}
      </span>
    );
  }

  const tone = accent === "amber" ? "amber" : "ink";
  return (
    <span className={cn(base, toneMap[variant][tone], className)}>
      {children}
    </span>
  );
}
