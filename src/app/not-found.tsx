'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button, Title, Text } from '@/components/ds';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 overflow-hidden relative">
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-headline font-black pointer-events-none select-none leading-none overflow-hidden text-display-sm text-primary/[0.04]"
        style={{ fontSize: '45vw' }}
      >
        404
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <p className="font-headline text-xs tracking-[0.2em] uppercase text-primary/70 mb-6">404</p>
        <Title as="h1" className="mb-4 text-display-sm">
          {t('title')}
        </Title>
        <Text size="base" strength="secondary" className="max-w-md mx-auto mb-10">
          {t('description')}
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Button variant="secondary" accent="neutral" size="md" onClick={() => history.back()}>
            <ArrowLeft className="w-4 h-4" />
            {t('goBack')}
          </Button>
          <Button variant="primary" accent="amber" size="md" href="/">
            <Home className="w-4 h-4" />
            {t('goHome')}
          </Button>
        </div>

        <div className="border-t border-foreground/[0.07] pt-8">
          <p className="font-headline text-[10px] tracking-[0.3em] uppercase text-foreground/25 mb-6">
            {t('interestedIn')}
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            {(['/blog', '/#projects', '/experience', '/contact'] as const).map((href) => {
              const key = href.replace('/#', '').replace('/', '') as 'blog' | 'projects' | 'experience' | 'contact';
              return (
                <Link key={href} href={href} className="font-headline text-[11px] tracking-widest uppercase text-foreground/35 hover:text-primary transition-colors duration-200">
                  {t(key)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
