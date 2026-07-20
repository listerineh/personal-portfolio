'use client';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/theme-context';

export function Toaster() {
  const { toasts } = useToast();
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <ToastPrimitives.Provider swipeDirection="right">
      {toasts.map(({ id, title, description, action, variant, open, onOpenChange }) => (
        <ToastPrimitives.Root
          key={id}
          open={open}
          onOpenChange={onOpenChange}
          className="pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl p-4 pr-8 shadow-2xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full"
          style={{
            background: dark ? 'rgba(18,18,22,0.98)' : 'rgba(255,255,255,0.98)',
            border: `1px solid ${variant === 'destructive' ? 'rgba(239,68,68,0.3)' : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            backdropFilter: 'blur(12px)',
            color: variant === 'destructive' ? '#f87171' : undefined,
          }}
        >
          <div className="flex flex-col gap-0.5">
            {title && (
              <ToastPrimitives.Title className="text-sm font-semibold">
                {title}
              </ToastPrimitives.Title>
            )}
            {description && (
              <ToastPrimitives.Description className="text-xs text-foreground/60">
                {description}
              </ToastPrimitives.Description>
            )}
          </div>
          {action}
          <ToastPrimitives.Close
            className="absolute right-2 top-2 rounded-lg p-1 opacity-40 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </ToastPrimitives.Close>
        </ToastPrimitives.Root>
      ))}
      <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px]" />
    </ToastPrimitives.Provider>
  );
}
