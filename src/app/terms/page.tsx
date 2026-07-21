'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');
  
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="pt-36 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 border-b border-foreground/[0.06]">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-headline tracking-[0.2em] uppercase text-foreground/35 hover:text-amber-500 transition-colors mb-10">
              ← Back
            </Link>
            <p className="text-[11px] font-headline tracking-[0.25em] uppercase text-amber-500/70 mb-4">Legal</p>
            <h1
              className="font-headline font-black leading-[0.9] text-foreground mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
            >
              {t('title')}
            </h1>
            <p className="text-foreground/40 text-sm font-headline tracking-wide">
              {t('lastUpdated')} {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
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
                <h2 className="font-headline font-black text-amber-500 mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>{title}</h2>
                <p className="text-foreground/55 leading-relaxed">{content}</p>
              </section>
            ))}

            {/* License with not-allowed list */}
            <section>
              <h2 className="font-headline font-black text-amber-500 mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('licenseTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed mb-4">{t('licenseText')}</p>
              <h3 className="font-headline font-semibold text-foreground/70 text-sm uppercase tracking-widest mb-3">{t('licenseNotAllowedTitle')}</h3>
              <ul className="space-y-2 pl-4 border-l-2 border-amber-500/20">
                {[t('modifyMaterials'), t('commercialUse'), t('reverseEngineer'), t('removeCopyright'), t('transferMaterials')].map((item) => (
                  <li key={item} className="text-foreground/50 text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>

            {/* Blog content with callout box */}
            <section>
              <h2 className="font-headline font-black text-amber-500 mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('blogContentTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed mb-4">{t('blogContentText')}</p>
              <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                <p className="text-xs font-headline tracking-widest uppercase text-foreground/40 mb-2">{t('codeExamplesLabel')}</p>
                <p className="text-sm text-foreground/50">{t('codeExamplesText')}</p>
              </div>
            </section>

            {/* Note callout */}
            <section className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-6">
              <p className="text-sm text-foreground/55 leading-relaxed">
                <span className="font-semibold text-amber-500">{t('noteLabel')} </span>
                {t('noteText', { privacyPolicy: 'Privacy Policy' }).split('Privacy Policy').map((part, i, arr) =>
                  i < arr.length - 1 ? <span key={i}>{part}<Link href="/privacy" className="text-amber-500 hover:text-amber-400 underline underline-offset-2">Privacy Policy</Link></span> : part
                )}
              </p>
            </section>

            {/* Contact */}
            <section className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-8">
              <h2 className="font-headline font-black text-amber-500 mb-4" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('contactInfoTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed">
                {t('contactInfoText', { contactForm: 'contact form' }).split('contact form').map((part, i, arr) =>
                  i < arr.length - 1 ? <span key={i}>{part}<Link href="/#contact" className="text-amber-500 hover:text-amber-400 underline underline-offset-2">contact form</Link></span> : part
                )}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
