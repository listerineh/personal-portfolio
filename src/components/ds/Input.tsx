"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { Accent } from "./types";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Kept for API compatibility; focus is always the ink/amber ring of the surface. */
  accent?: Accent;
  error?: boolean;
}

export const fieldBase =
  "w-full rounded-md bg-card text-foreground placeholder:text-muted-foreground border border-input/60 " +
  "px-4 text-base outline-none transition-[border-color,box-shadow,background-color] duration-snap ease-snap motion-reduce:transition-none " +
  "hover:border-input focus-visible:border-primary focus-visible:shadow-[0_0_0_4px_rgb(var(--primary)/0.18)] " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const Input = forwardRef<HTMLInputElement, InputProps>(({ accent: _accent, error = false, className, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={error || props["aria-invalid"] || undefined}
    className={cn(fieldBase, "min-h-12", error && "border-destructive shadow-[0_0_0_4px_rgb(var(--destructive)/0.15)]", className)}
    {...props}
  />
));

Input.displayName = "Input";
