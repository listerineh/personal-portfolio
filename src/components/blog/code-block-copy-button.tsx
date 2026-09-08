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
      className={cn(
        'absolute top-3 right-3 p-2 rounded-lg transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97]',
        'bg-primary/10 hover:bg-primary/20 text-foreground/55 hover:text-foreground',
        'border border-foreground/10 hover:border-primary/50',
        'flex items-center gap-2 text-xs font-medium',
        copied && 'bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400'
      )}
      title={copied ? t('copied') : t('copy')}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          <span>{t('copied')}</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>{t('copy')}</span>
        </>
      )}
    </button>
  );
}
