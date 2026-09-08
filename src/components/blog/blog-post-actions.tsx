'use client';

import { useTranslations } from 'next-intl';
import { Text, AccentCard } from '@/components/ds';
import { BlogReactions } from './blog-reactions';
import { ShareButtons } from './share-buttons';
import { NewsletterSubscribe } from './newsletter-subscribe';
import { RelatedPosts } from '@/components/common/related-posts';
import { NewsletterSignup } from '@/components/common/newsletter-signup';

interface BlogPostActionsProps {
  slug: string;
  title: string;
  url: string;
}

export function BlogPostActions({ slug, title, url }: BlogPostActionsProps) {
  const t = useTranslations('blog');

  return (
    <>
      <div className="my-8 md:my-12 h-px bg-foreground/[0.06]" />

      <div className="mb-8">
        <p className="font-headline text-xs tracking-[0.2em] uppercase text-primary/70 mb-4">{t('whatDidYouThink')}</p>
        <BlogReactions slug={slug} />
      </div>

      <div className="my-8 h-px bg-foreground/[0.06]" />

      <AccentCard accent="amber" className="mb-8 p-6 md:p-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <Text size="base" strength="primary" className="mb-1">{t('foundHelpful')}</Text>
            <Text size="sm" strength="secondary">{t('helpOthersDiscover')}</Text>
          </div>
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <ShareButtons title={title} url={url} />
          </div>
        </div>
      </AccentCard>

      <RelatedPosts currentSlug={slug} />

      <NewsletterSignup />
    </>
  );
}
