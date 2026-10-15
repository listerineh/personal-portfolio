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
  "plaque w-full bg-card text-foreground placeholder:text-muted-foreground border border-input " +
  "px-4 text-base outline-none transition-[border-color,box-shadow] duration-snap ease-snap motion-reduce:transition-none " +
  "hover:border-foreground focus-visible:border-foreground focus-visible:shadow-[inset_0_0_0_1px_rgb(var(--foreground))] " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const Input = forwardRef<HTMLInputElement, InputProps>(({ accent: _accent, error = false, className, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={error || props["aria-invalid"] || undefined}
    className={cn(fieldBase, "min-h-12", error && "border-destructive shadow-[inset_0_0_0_1px_rgb(var(--destructive))]", className)}
    {...props}
  />
));

Input.displayName = "Input";
