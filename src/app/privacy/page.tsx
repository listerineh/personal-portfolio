'use client';

import { PageShell } from '@/components/layout';
import { PageHeader } from '@/components/ds';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' }));
  }, [locale]);

  return (
    <>
      <PageShell>
        <PageHeader
          name={t('title')}
          title={t('title')}
          titleSize="room"
          nav={
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-[0.3em] hover:underline">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {tCommon('back')}
            </Link>
          }
        >
          <p className="text-catalog text-muted-foreground">
            {t('lastUpdated')} {lastUpdated}
          </p>
        </PageHeader>

        {/* Content */}
        <div className="px-gutter py-16 md:py-24">
          <div className="mx-auto grid max-w-[1296px] gap-14 lg:pl-[calc(100%/12*3)]">

            {/* Cookies section with list */}
            <section>
              <h2 className="text-subhead mb-4">
                {t('infoCollectTitle')}
              </h2>
              <h3 className="mb-2 mt-8 text-base font-semibold">{t('autoCollectedTitle')}</h3>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90 mb-4">{t('autoCollectedText')}</p>
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 marker:text-foreground mb-6">
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
              <div className="plaque max-w-[68ch] p-5 md:p-6">
                <p className="text-catalog mb-3 text-muted-foreground">{t('cookieTypesLabel')}</p>
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
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 marker:text-foreground">
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
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 marker:text-foreground">
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
            <section className="plaque max-w-[68ch] p-6 md:p-8">
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
