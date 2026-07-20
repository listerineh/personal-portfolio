import type React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, required = false, className = '', children }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-headline font-semibold uppercase tracking-widest text-foreground/50 select-none">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 font-medium mt-0.5">{error}</p>
      )}
    </div>
  );
}
