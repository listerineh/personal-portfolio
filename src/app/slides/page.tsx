import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout';
import { Button, PageHeader } from '@/components/ds';
import { DEFAULT_OG_IMAGE, requestLocale, shareMetadata } from '@/lib/metadata';
import { listPublishedDecks } from '@/features/slides/store';
import { deckSummariesByLocale } from '@/features/slides/summary';
import { TalkGrid } from '@/features/slides/TalkGrid';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  const t = await getTranslations({ locale, namespace: 'slidesPage' });
  return shareMetadata({ title: t('title'), description: t('intro'), path: '/slides', image: DEFAULT_OG_IMAGE, locale });
}

/** Every published talk, newest first, each opening in the viewer. */
export default async function SlidesPage() {
  const t = await getTranslations('slidesPage');
  // Storage trouble shouldn't take the page down: it shows the empty state instead.
  const decks = await listPublishedDecks().catch(() => []);

  return (
    <PageShell>
      <PageHeader title={t('title')} intro={t('intro')} ambient />
      <section aria-label={t('listLabel')} className="px-gutter pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px]">
          {decks.length === 0 ? (
            <div className="panel flex flex-col items-start gap-4 p-8 md:p-12">
              <h2 className="text-subhead">{t('emptyTitle')}</h2>
              <p className="text-lead max-w-[56ch] text-muted-foreground">{t('emptyBody')}</p>
              <Button href="/contact" variant="secondary">
                {t('emptyAction')}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <TalkGrid byLocale={deckSummariesByLocale(decks)} />
          )}
        </div>
      </section>
    </PageShell>
  );
}
