"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./Input";
import type { Accent } from "./types";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Kept for API compatibility; focus is always the ink/amber ring of the surface. */
  accent?: Accent;
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ accent: _accent, error = false, className, ...props }, ref) => (
  <textarea
    ref={ref}
    aria-invalid={error || props["aria-invalid"] || undefined}
    className={cn(fieldBase, "min-h-36 resize-y py-3 leading-relaxed", error && "border-destructive shadow-[0_0_0_4px_rgb(var(--destructive)/0.15)]", className)}
    {...props}
  />
));

Textarea.displayName = "Textarea";
