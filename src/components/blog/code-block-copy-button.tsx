'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockCopyButtonProps {
  code: string;
}

export function CodeBlockCopyButton({ code }: CodeBlockCopyButtonProps) {
  const t = useTranslations('common');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-live="polite"
      className={cn(
        'absolute right-2 top-2 inline-flex min-h-9 items-center gap-2 border border-foreground/30 bg-card px-2.5 font-mono text-xs font-medium text-foreground transition-colors duration-snap ease-snap hover:border-foreground',
        copied && 'border-foreground bg-foreground text-surface'
      )}
      title={copied ? t('copied') : t('copy')}
    >
      {copied ? (
        <>
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
          <span>{t('copied')}</span>
        </>
      ) : (
        <>
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
          <span>{t('copy')}</span>
        </>
      )}
    </button>
  );
}
