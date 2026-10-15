"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface DSSwitchProps {
  id?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** A square toggle; the thumb travels on the snap spring. */
export function Switch({ id, checked, onCheckedChange, disabled, className = "", "aria-label": ariaLabel }: DSSwitchProps) {
  return (
    <SwitchPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-[1.5px] border-foreground p-0.5 transition-colors duration-snap ease-snap",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block h-[18px] w-[18px] bg-foreground transition-transform duration-snap ease-snap data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 motion-reduce:transition-none" />
    </SwitchPrimitive.Root>
  );
}
