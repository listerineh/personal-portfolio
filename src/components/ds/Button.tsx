"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type Accent, type ButtonVariant, type ButtonSize } from "./types";

interface ButtonProps {
  variant?: ButtonVariant;
  /** `amber` marks the one live action on a wall; everything else is ink. Legacy accents map to ink. */
  accent?: Accent;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const variantMap: Record<ButtonVariant, { amber: string; ink: string }> = {
  primary: {
    amber: "bg-primary text-primary-foreground hover:bg-primary/90",
    ink: "bg-foreground text-background hover:bg-foreground/85",
  },
  secondary: {
    amber:
      "border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-background",
    ink: "border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-background",
  },
  ghost: {
    amber:
      "px-0 text-primary underline decoration-1 underline-offset-[0.3em] hover:decoration-2",
    ink: "px-0 text-foreground underline decoration-1 underline-offset-[0.3em] hover:decoration-2",
  },
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold [font-stretch:108%] tracking-[-0.005em] select-none " +
  "transition-[color,background-color,border-color,text-decoration-thickness,transform] duration-snap ease-snap " +
  "active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

export function Button({
  variant = "primary",
  accent = "neutral",
  size = "md",
  href,
  external = false,
  className,
  children,
  onClick,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const tone = accent === "amber" ? "amber" : "ink";
  const classes = cn(base, sizeMap[size], variantMap[variant][tone], className);

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
