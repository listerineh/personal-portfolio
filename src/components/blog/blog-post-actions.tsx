'use client';

import { useTranslations } from 'next-intl';
import { BlogReactions } from './blog-reactions';
import { ShareButtons } from './share-buttons';

interface BlogPostActionsProps {
  slug: string;
  title: string;
  url: string;
}

/** After the last paragraph: react and share, side by side in one panel. */
export function BlogPostActions({ slug, title, url }: BlogPostActionsProps) {
  const t = useTranslations('blog');

  return (
    <div className="panel mt-16 grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-8">
      <section aria-labelledby="reactions-title">
        <h2 id="reactions-title" className="text-headline">
          {t('whatDidYouThink')}
        </h2>
        <div className="mt-4">
          <BlogReactions slug={slug} />
        </div>
      </section>
      <section aria-labelledby="share-title">
        <h2 id="share-title" className="text-headline">
          {t('foundHelpful')}
        </h2>
        <p className="mt-2 text-[0.9375rem] text-muted-foreground">{t('helpOthersDiscover')}</p>
        <div className="mt-4">
          <ShareButtons title={title} url={url} />
        </div>
      </section>
    </div>
  );
}
