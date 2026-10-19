"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type Accent, type ButtonVariant, type ButtonSize } from "./types";

interface ButtonProps {
  variant?: ButtonVariant;
  /** `amber` = the brand action (one per view); everything else is ink. Legacy accents map to ink. */
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
    amber: "rounded-full bg-primary text-primary-foreground hover:brightness-[1.07]",
    ink: "rounded-full bg-foreground text-surface hover:bg-foreground/85",
  },
  secondary: {
    amber: "rounded-full bg-primary/[0.12] text-primary hover:bg-primary/[0.18]",
    ink: "rounded-full bg-foreground/[0.07] text-foreground hover:bg-foreground/[0.11]",
  },
  ghost: {
    amber: "rounded-md px-0 text-primary hover:underline",
    ink: "rounded-md px-0 text-foreground hover:underline",
  },
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-6 text-base",
};

// Press: shrinks on the snap spring, springs back with a little bounce (the press carried momentum).
const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-[-0.01em] select-none underline-offset-[0.25em] " +
  "transition-[color,background-color,filter,transform] duration-bounce ease-bounce " +
  "active:scale-[0.96] active:duration-snap active:ease-snap motion-reduce:transition-none motion-reduce:active:scale-100 " +
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
