'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
      <Header />
      <main>
        {/* Hero */}
        <div className="pt-36 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 border-b border-foreground/[0.06]">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-headline tracking-[0.2em] uppercase text-foreground/35 hover:text-primary transition-colors mb-10">
              ← {tCommon('back')}
            </Link>
            <p className="text-[11px] font-headline tracking-[0.25em] uppercase text-primary/70 mb-4">{tCommon('legal')}</p>
            <h1
              className="font-headline font-black leading-[0.9] text-foreground mb-6 text-display-sm"
            >
              {t('title')}
            </h1>
            <p className="text-foreground/40 text-sm font-headline tracking-wide">
              {t('lastUpdated')} {lastUpdated}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-20">
          <div className="max-w-4xl mx-auto space-y-16">

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
                <h2 className="font-headline font-black text-primary mb-5 text-headline">{title}</h2>
                <p className="text-foreground/55 leading-relaxed">{content}</p>
              </section>
            ))}

            {/* License with not-allowed list */}
            <section>
              <h2 className="font-headline font-black text-primary mb-5 text-headline">
                {t('licenseTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed mb-4">{t('licenseText')}</p>
              <h3 className="font-headline font-semibold text-foreground/70 text-sm uppercase tracking-widest mb-3">{t('licenseNotAllowedTitle')}</h3>
              <ul className="space-y-2 pl-4 border-l-2 border-primary/20">
                {[t('modifyMaterials'), t('commercialUse'), t('reverseEngineer'), t('removeCopyright'), t('transferMaterials')].map((item) => (
                  <li key={item} className="text-foreground/50 text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>

            {/* Blog content with callout box */}
            <section>
              <h2 className="font-headline font-black text-primary mb-5 text-headline">
                {t('blogContentTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed mb-4">{t('blogContentText')}</p>
              <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                <p className="text-xs font-headline tracking-widest uppercase text-foreground/40 mb-2">{t('codeExamplesLabel')}</p>
                <p className="text-sm text-foreground/50">{t('codeExamplesText')}</p>
              </div>
            </section>

            {/* Note callout */}
            <section className="rounded-xl border border-primary/15 bg-primary/[0.03] p-6">
              <p className="text-sm text-foreground/55 leading-relaxed">
                <span className="font-semibold text-primary">{t('noteLabel')} </span>
                {t.rich('noteText', {
                  privacyLink: (chunks) => <Link href="/privacy" className="text-primary hover:text-primary/80 underline underline-offset-2">{chunks}</Link>
                })}
              </p>
            </section>

            {/* Contact */}
            <section className="rounded-xl border border-primary/15 bg-primary/[0.03] p-8">
              <h2 className="font-headline font-black text-primary mb-4 text-headline">
                {t('contactInfoTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed">
                {t.rich('contactInfoText', {
                  contactLink: (chunks) => <Link href="/contact" className="text-primary hover:text-primary/80 underline underline-offset-2">{chunks}</Link>
                })}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
