'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { useTheme } from '@/context/theme-context';

export const Dropdown = DropdownMenuPrimitive.Root;
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownSeparator = DropdownMenuPrimitive.Separator;

export function DropdownContent({
  children,
  align = 'end',
  className = '',
}: {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}) {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={4}
        className={`z-50 min-w-[8rem] overflow-hidden rounded-xl p-1 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${className}`}
        style={{
          background: dark ? 'rgba(18,18,22,0.98)' : 'rgba(255,255,255,0.98)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownItem({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <DropdownMenuPrimitive.Item
      onClick={onClick}
      className={`relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:bg-foreground/6 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownCheckboxItem({
  children,
  checked,
  onCheckedChange,
  className = '',
}: {
  children: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={`relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 pl-8 text-sm outline-none transition-colors focus:bg-foreground/6 ${className}`}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenuPrimitive.Label className="px-3 py-1.5 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
      {children}
    </DropdownMenuPrimitive.Label>
  );
}
