import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WallProps {
  as?: ElementType;
  /** `paint` = ink blue with the palette re-scoped; `plaster` = the bare ground (bone). */
  tone?: "paint" | "plaster";
  className?: string;
  id?: string;
  children: ReactNode;
}

/** A wall to hang work on. Painted walls re-scope text, muted and amber tokens for AA. */
export function Wall({
  as: Tag = "div",
  tone = "paint",
  className,
  id,
  children,
}: WallProps) {
  return (
    <Tag
      id={id}
      className={cn(
        tone === "paint" ? "wall" : "bg-background text-foreground",
        "px-gutter",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface PlaqueProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** A paper label. Restores ground tokens, so it reads the same on any wall. */
export function Plaque({ as: Tag = "div", className, children }: PlaqueProps) {
  return <Tag className={cn("plaque p-5 md:p-6", className)}>{children}</Tag>;
}
