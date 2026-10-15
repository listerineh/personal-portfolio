"use client";

import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrandLinkProps {
  href: string;
  /** Brand color (hex). Solid links keep ink text, so pick a light-enough brand color. */
  color: string;
  variant?: "solid" | "outline";
  className?: string;
  children: ReactNode;
}

/** External link to a platform (Spotify, YouTube, ...), square, colored by the platform. */
export function BrandLink({ href, color, variant = "outline", className, children }: BrandLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--brand": color } as CSSProperties}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 px-5 text-sm font-semibold transition-[background-color,color,transform] duration-snap ease-snap active:scale-[0.98] motion-reduce:transition-none",
        variant === "solid"
          ? "bg-[var(--brand)] text-[#141614] hover:brightness-110"
          : "border-[1.5px] border-[var(--brand)] text-foreground hover:bg-[var(--brand)] hover:text-[#141614]",
        className,
      )}
    >
      {children}
    </a>
  );
}
