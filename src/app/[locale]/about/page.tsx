import { setRequestLocale } from 'next-intl/server';
import { metadataFor } from '@/lib/metadata';
import { PageShell } from '@/components/layout';
import { AboutContent } from '@/components/sections/about-content';
import type { Locale } from '@/i18n/config';

export const generateMetadata = metadataFor('about');

/** Static: prerendered in both languages. */
export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  setRequestLocale((await params).locale);
  return (
    <PageShell>
      <AboutContent />
    </PageShell>
  );
}
