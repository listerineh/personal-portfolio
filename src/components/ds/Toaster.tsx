'use client';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/theme-context';

export function Toaster() {
  const { toasts } = useToast();
  const { theme } = useTheme();
  const dark = theme === 'dark';

  const isDestructive = (variant?: string) => variant === 'destructive';

  return (
    <ToastPrimitives.Provider swipeDirection="right">
      {toasts.map(({ id, title, description, action, variant, open, onOpenChange }) => (
        <ToastPrimitives.Root
          key={id}
          open={open}
          onOpenChange={onOpenChange}
          className="pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl pr-8 shadow-2xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full"
          style={{
            background: dark ? 'rgba(14,14,16,0.97)' : 'rgba(255,255,255,0.97)',
            border: `1px solid ${isDestructive(variant)
              ? 'rgba(239,68,68,0.25)'
              : dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Left accent bar */}
          <div
            className="w-1 self-stretch rounded-l-xl flex-shrink-0"
            style={{ background: isDestructive(variant) ? '#ef4444' : '#f59e0b' }}
          />

          <div className="flex flex-col gap-0.5 py-3.5">
            {title && (
              <ToastPrimitives.Title
                className="font-headline text-xs tracking-wide font-semibold"
                style={{ color: isDestructive(variant) ? '#f87171' : dark ? '#fbbf24' : '#d97706' }}
              >
                {title}
              </ToastPrimitives.Title>
            )}
            {description && (
              <ToastPrimitives.Description className="text-xs leading-relaxed text-foreground/50 mt-0.5">
                {description}
              </ToastPrimitives.Description>
            )}
          </div>

          {action}
          <ToastPrimitives.Close
            className="absolute right-2 top-2 rounded-lg p-1 opacity-30 hover:opacity-80 transition-opacity"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </ToastPrimitives.Close>
        </ToastPrimitives.Root>
      ))}
      <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[380px]" />
    </ToastPrimitives.Provider>
  );
}
