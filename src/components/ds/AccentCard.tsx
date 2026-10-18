import { cn } from "@/lib/utils";
import { type Accent } from "./types";
import { type ReactNode } from "react";

interface AccentCardProps {
  /** `amber` adds the live marker; other accents render as a plain plaque. */
  accent?: Accent;
  animate?: boolean;
  className?: string;
  children: ReactNode;
}

/** A paper plaque. Flat, square, no border: elevation comes only from the hang shadow. */
export function AccentCard({
  accent = "neutral",
  animate,
  className,
  children,
}: AccentCardProps) {
  return (
    <div
      className={cn(
        animate && "reveal-up",
        "panel relative p-5 md:p-6",
        className,
      )}
    >
      {accent === "amber" && (
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary"
        />
      )}
      {children}
    </div>
  );
}
