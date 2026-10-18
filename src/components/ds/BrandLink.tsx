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
        "inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,color,transform,filter] duration-snap ease-snap active:scale-[0.96] motion-reduce:transition-none",
        variant === "solid"
          ? "bg-[var(--brand)] text-[#16181D] hover:brightness-110"
          : "border border-[var(--brand)] text-foreground hover:bg-foreground/[0.06]",
        className,
      )}
    >
      {children}
    </a>
  );
}
