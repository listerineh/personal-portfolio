'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/theme-context';

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;

export function ModalContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className="fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className
        )}
        style={{
          background: dark ? 'rgba(18,18,22,0.98)' : 'rgba(255,255,255,0.98)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        }}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-lg p-1 opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 pr-6">{children}</div>;
}

export function ModalTitle({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Title
      className="font-headline font-bold mb-1"
      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
    >
      {children}
    </DialogPrimitive.Title>
  );
}

export function ModalDescription({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Description className="text-sm text-foreground/50">
      {children}
    </DialogPrimitive.Description>
  );
}
