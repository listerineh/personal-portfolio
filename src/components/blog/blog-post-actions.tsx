'use client';

import { useTranslations } from 'next-intl';
import type { BlogPostSummary } from '@/types';
import { BlogReactions } from './blog-reactions';
import { ShareButtons } from './share-buttons';
import { RelatedPosts } from '@/components/common/related-posts';
import { NewsletterSignup } from '@/components/common/newsletter-signup';

interface BlogPostActionsProps {
  slug: string;
  related: BlogPostSummary[];
  title: string;
  url: string;
}

/** After the last paragraph: react, share, keep reading, subscribe. */
export function BlogPostActions({ slug, title, url, related }: BlogPostActionsProps) {
  const t = useTranslations('blog');

  return (
    <div className="mt-16 grid gap-5">
      <section aria-labelledby="reactions-title" className="panel p-6 md:p-8">
        <h2 id="reactions-title" className="text-headline">
          {t('whatDidYouThink')}
        </h2>
        <div className="mt-4">
          <BlogReactions slug={slug} />
        </div>
      </section>

      <section aria-labelledby="share-title" className="panel p-6 md:p-8">
        <h2 id="share-title" className="text-headline">
          {t('foundHelpful')}
        </h2>
        <p className="mt-2 max-w-[56ch] text-muted-foreground">{t('helpOthersDiscover')}</p>
        <div className="mt-4">
          <ShareButtons title={title} url={url} />
        </div>
      </section>

      <RelatedPosts posts={related} />

      <NewsletterSignup />
    </div>
  );
}
