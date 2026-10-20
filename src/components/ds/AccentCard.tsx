import { cn } from "@/lib/utils";
import { type Accent } from "./types";
import { type ReactNode } from "react";

interface AccentCardProps {
  /** `amber` adds the live dot; other accents render as a plain panel. */
  accent?: Accent;
  className?: string;
  children: ReactNode;
}

/** A soft rounded panel; `amber` marks it with a small live dot. */
export function AccentCard({
  accent = "neutral",
  className,
  children,
}: AccentCardProps) {
  return (
    <div
      className={cn(
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
