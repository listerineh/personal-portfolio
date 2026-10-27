import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout';
import { Button, PageHeader } from '@/components/ds';
import { metadataFor } from '@/lib/metadata';
import { listPublishedDecks } from '@/features/slides/store';
import { deckSummariesByLocale } from '@/features/slides/summary';
import { TalkGrid } from '@/features/slides/TalkGrid';
import { talksStructuredData } from '@/features/slides/structured-data';

export const generateMetadata = metadataFor('slides');

/** Every published talk, newest first, each opening in the viewer. Static, refreshed when a deck is saved (its cache
 * tag) or after the store's cache window. */
export default async function SlidesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('slidesPage');
  // Storage trouble shouldn't take the page down: it shows the empty state instead.
  const decks = await listPublishedDecks().catch(() => []);
  const structuredData = talksStructuredData(decks, locale);

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
