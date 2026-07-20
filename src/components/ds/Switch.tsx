'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useTheme } from '@/context/theme-context';

interface DSSwitchProps {
  id?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({ id, checked, onCheckedChange, disabled, className = '' }: DSSwitchProps) {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <SwitchPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{
        background: checked
          ? '#818cf8'
          : dark
            ? 'rgba(255,255,255,0.12)'
            : 'rgba(0,0,0,0.12)',
      }}
    >
      <SwitchPrimitive.Thumb
        className="pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform"
        style={{
          background: 'white',
          transform: checked ? 'translateX(16px)' : 'translateX(0px)',
        }}
      />
    </SwitchPrimitive.Root>
  );
}
