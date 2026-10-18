'use client';

import { PageShell } from '@/components/layout';
import { PageHeader } from '@/components/ds';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { LEGAL_LAST_UPDATED } from '@/lib/legal';

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const lastUpdated = new Date(`${LEGAL_LAST_UPDATED}T12:00:00Z`).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <>
      <PageShell>
        <PageHeader
          title={t('title')}
          titleSize="section"
          nav={
            <Link href="/" className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground/[0.06] pl-2.5 pr-4 text-[0.8125rem] font-medium text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.1]">
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              {tCommon('back')}
            </Link>
          }
        >
          <p className="text-meta text-muted-foreground">
            {t('lastUpdated')} {lastUpdated}
          </p>
        </PageHeader>

        {/* Content */}
        <div className="px-gutter pb-24 pt-4 md:pb-32 md:pt-8">
          <div className="mx-auto grid max-w-[1200px] gap-14 [&>*]:max-w-[760px]">

            {/* Cookies section with list */}
            <section>
              <h2 className="text-subhead mb-4">
                {t('infoCollectTitle')}
              </h2>
              <h3 className="mb-2 mt-8 text-base font-semibold">{t('autoCollectedTitle')}</h3>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90 mb-4">{t('autoCollectedText')}</p>
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 marker:text-primary mb-6">
                {[t('browserType'), t('operatingSystem'), t('ipAddress'), t('pagesVisited'), t('referringWebsite')].map((item) => (
                  <li key={item} className="leading-relaxed text-foreground/85">{item}</li>
                ))}
              </ul>
              <h3 className="mb-2 mt-8 text-base font-semibold">{t('cookiesTitle')}</h3>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90 mb-4">
                {t.rich('cookiesText', {
                  cookieLink: (chunks) => <Link href="/" className="font-medium underline decoration-primary decoration-1 underline-offset-[0.22em] hover:decoration-2">{chunks}</Link>
                })}
              </p>
              <div className="panel max-w-[68ch] p-5 md:p-6">
                <p className="text-meta mb-3 text-muted-foreground">{t('cookieTypesLabel')}</p>
                <ul className="space-y-2">
                  {[
                    [t('necessaryCookies'), t('necessaryCookiesDesc')],
                    [t('analyticsCookies'), t('analyticsCookiesDesc')],
                    [t('preferenceCookies'), t('preferenceCookiesDesc')],
                  ].map(([label, desc]) => (
                    <li key={label} className="text-sm leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{label}</span> {desc}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* How we use + rights with lists */}
            <section>
              <h2 className="text-subhead mb-4">
                {t('howUseTitle')}
              </h2>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90 mb-4">{t('howUseText')}</p>
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 marker:text-primary">
                {[t('provideWebsite'), t('improveExperience'), t('analyzeUsage'), t('rememberPreferences'), t('detectIssues')].map((item) => (
                  <li key={item} className="leading-relaxed text-foreground/85">{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-subhead mb-4">
                {t('yourRightsTitle')}
              </h2>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90 mb-4">{t('yourRightsText')}</p>
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 marker:text-primary">
                {[t('accessInfo'), t('correctInfo'), t('deleteInfo'), t('objectProcessing'), t('withdrawConsent')].map((item) => (
                  <li key={item} className="leading-relaxed text-foreground/85">{item}</li>
                ))}
              </ul>
            </section>

            {/* Remaining generic sections */}
            {[
              [t('thirdPartyTitle'), t('thirdPartyText')],
              [t('dataRetentionTitle'), t('dataRetentionText')],
              [t('childrenTitle'), t('childrenText')],
              [t('changesTitle'), t('changesText')],
            ].map(([title, content]) => (
              <section key={title}>
                <h2 className="text-subhead mb-4">{title}</h2>
                <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90">{content}</p>
              </section>
            ))}

            {/* Contact */}
            <section className="panel max-w-[68ch] p-6 md:p-8">
              <h2 className="text-subhead mb-4">
                {t('contactTitle')}
              </h2>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90">
                {t.rich('contactText', {
                  contactLink: (chunks) => <Link href="/contact" className="font-medium underline decoration-primary decoration-1 underline-offset-[0.22em] hover:decoration-2">{chunks}</Link>
                })}
              </p>
            </section>
          </div>
        </div>
      </PageShell>
    </>
  );
}
