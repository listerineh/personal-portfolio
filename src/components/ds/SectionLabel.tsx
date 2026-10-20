import { cn } from "@/lib/utils";
import { type Accent } from "./types";
import { type ReactNode } from "react";

interface SectionLabelProps {
  /** `amber` marks a live item; other accents render muted. */
  accent?: Accent;
  className?: string;
  children: ReactNode;
}

/**
 * Catalog line: the data printed on a label (date, medium, place).
 * Never use it as an eyebrow above a heading; the heading carries its own weight.
 */
export function SectionLabel({
  accent = "neutral",
  className,
  children,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-meta",
        accent === "amber" ? "text-primary" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
