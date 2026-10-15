'use client';

import { PageShell } from '@/components/layout';
import { PageHeader } from '@/components/ds';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function TermsPage() {
  const t = useTranslations('terms');
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

            {/* Generic sections */}
            {[
              [t('agreementTitle'), t('agreementText')],
              [t('disclaimerTitle'), `${t('disclaimerText1')} ${t('disclaimerText2')}`],
              [t('limitationsTitle'), t('limitationsText')],
              [t('externalLinksTitle'), t('externalLinksText')],
              [t('userCommentsTitle'), t('userCommentsText')],
              [t('intellectualPropertyTitle'), t('intellectualPropertyText')],
              [t('modificationsTitle'), t('modificationsText')],
              [t('governingLawTitle'), t('governingLawText')],
            ].map(([title, content]) => (
              <section key={title}>
                <h2 className="text-subhead mb-4">{title}</h2>
                <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90">{content}</p>
              </section>
            ))}

            {/* License with not-allowed list */}
            <section>
              <h2 className="text-subhead mb-4">
                {t('licenseTitle')}
              </h2>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90 mb-4">{t('licenseText')}</p>
              <h3 className="mb-2 mt-8 text-base font-semibold">{t('licenseNotAllowedTitle')}</h3>
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-5 marker:text-foreground">
                {[t('modifyMaterials'), t('commercialUse'), t('reverseEngineer'), t('removeCopyright'), t('transferMaterials')].map((item) => (
                  <li key={item} className="leading-relaxed text-foreground/85">{item}</li>
                ))}
              </ul>
            </section>

            {/* Blog content with callout box */}
            <section>
              <h2 className="text-subhead mb-4">
                {t('blogContentTitle')}
              </h2>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90 mb-4">{t('blogContentText')}</p>
              <div className="plaque max-w-[68ch] p-5 md:p-6">
                <p className="text-catalog mb-2 text-muted-foreground">{t('codeExamplesLabel')}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{t('codeExamplesText')}</p>
              </div>
            </section>

            {/* Note callout */}
            <section className="plaque max-w-[68ch] p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-primary">{t('noteLabel')} </span>
                {t.rich('noteText', {
                  privacyLink: (chunks) => <Link href="/privacy" className="font-medium underline decoration-primary decoration-1 underline-offset-[0.22em] hover:decoration-2">{chunks}</Link>
                })}
              </p>
            </section>

            {/* Contact */}
            <section className="plaque max-w-[68ch] p-6 md:p-8">
              <h2 className="text-subhead mb-4">
                {t('contactInfoTitle')}
              </h2>
              <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90">
                {t.rich('contactInfoText', {
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
