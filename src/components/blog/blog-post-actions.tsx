'use client';

import { useTranslations } from 'next-intl';
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
      <div className="my-8 md:my-12" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">{t('whatDidYouThink')}</h3>
        <BlogReactions slug={slug} />
      </div>

      <div className="my-8" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      <div className="mb-8 p-6 md:p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-background to-background shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <p className="text-base md:text-lg font-medium text-foreground mb-1">
              {t('foundHelpful')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('helpOthersDiscover')}
            </p>
          </div>
          <div className="flex-shrink-0">
            <ShareButtons title={title} url={url} />
          </div>
        </div>
      </div>

      <RelatedPosts currentSlug={slug} />

      <NewsletterSignup />
    </>
  );
}
