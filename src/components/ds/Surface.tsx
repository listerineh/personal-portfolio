import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BandProps {
  as?: ElementType;
  /** `tint` = the alternate section ground (#F5F5F7 / #161617); `plain` = the page ground. */
  tone?: "tint" | "plain";
  className?: string;
  id?: string;
  children: ReactNode;
}

/** A full-width band of the page. Bands alternate plain and tint so sections read apart without lines. */
export function Band({
  as: Tag = "div",
  tone = "tint",
  className,
  id,
  children,
}: BandProps) {
  return (
    <Tag
      id={id}
      className={cn(
        tone === "tint" ? "tint" : "bg-background text-foreground",
        "px-gutter",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface PanelProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** A soft rounded surface for notices, form containers and empty states. It lifts off plain and tint grounds alike. */
export function Panel({ as: Tag = "div", className, children }: PanelProps) {
  return <Tag className={cn("panel p-6 md:p-8", className)}>{children}</Tag>;
}
