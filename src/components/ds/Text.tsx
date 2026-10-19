import { cn } from "@/lib/utils";
import { type Accent, type TextSize, type TextStrength } from "./types";
import { type ElementType, type ReactNode } from "react";

interface TextProps {
  as?: ElementType;
  size?: TextSize;
  strength?: TextStrength;
  /** Kept for API compatibility. Only `strength="accent"` uses color (live amber ink). */
  accent?: Accent;
  animate?: boolean;
  className?: string;
  children: ReactNode;
}

const sizeMap: Record<TextSize, string> = {
  xs: "text-xs leading-relaxed",
  sm: "text-sm leading-relaxed",
  base: "text-base leading-[1.6]",
  lg: "text-lead",
  xl: "text-xl leading-snug",
};

// Every strength holds AA on plain, tint and panel surfaces in both themes.
const strengthMap: Record<TextStrength, string> = {
  primary: "text-foreground",
  secondary: "text-muted-foreground",
  accent: "text-primary",
  muted: "text-muted-foreground",
};

export function Text({
  as: Tag = "p",
  size = "base",
  strength = "primary",
  animate,
  className,
  children,
}: TextProps) {
  return (
    <Tag
      className={cn(
        animate && "reveal-up",
        "max-w-[68ch]",
        sizeMap[size],
        strengthMap[strength],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
