'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('privacy');
  
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="pt-36 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 border-b border-foreground/[0.06]">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-headline tracking-[0.2em] uppercase text-foreground/35 hover:text-primary transition-colors mb-10">
              ← Back
            </Link>
            <p className="text-[11px] font-headline tracking-[0.25em] uppercase text-primary/70 mb-4">Legal</p>
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

            {/* Cookies section with list */}
            <section>
              <h2 className="font-headline font-black text-primary mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('infoCollectTitle')}
              </h2>
              <h3 className="font-headline font-semibold text-foreground/70 text-sm uppercase tracking-widest mb-3">{t('autoCollectedTitle')}</h3>
              <p className="text-foreground/55 leading-relaxed mb-4">{t('autoCollectedText')}</p>
              <ul className="space-y-2 mb-6 pl-4 border-l-2 border-primary/20">
                {[t('browserType'), t('operatingSystem'), t('ipAddress'), t('pagesVisited'), t('referringWebsite')].map((item) => (
                  <li key={item} className="text-foreground/50 text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
              <h3 className="font-headline font-semibold text-foreground/70 text-sm uppercase tracking-widest mb-3">{t('cookiesTitle')}</h3>
              <p className="text-foreground/55 leading-relaxed mb-4">
                {t('cookiesText', { cookieSettings: 'cookie settings' }).split('cookie settings').map((part, i, arr) =>
                  i < arr.length - 1 ? <span key={i}>{part}<Link href="/" className="text-primary hover:text-primary/80 underline underline-offset-2">cookie settings</Link></span> : part
                )}
              </p>
              <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                <p className="text-xs font-headline tracking-widest uppercase text-foreground/40 mb-3">{t('cookieTypesLabel')}</p>
                <ul className="space-y-2">
                  {[
                    [t('necessaryCookies'), t('necessaryCookiesDesc')],
                    [t('analyticsCookies'), t('analyticsCookiesDesc')],
                    [t('preferenceCookies'), t('preferenceCookiesDesc')],
                  ].map(([label, desc]) => (
                    <li key={label} className="text-sm text-foreground/50"><span className="font-semibold text-foreground/70">{label}</span> {desc}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* How we use + rights with lists */}
            <section>
              <h2 className="font-headline font-black text-primary mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('howUseTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed mb-4">{t('howUseText')}</p>
              <ul className="space-y-2 pl-4 border-l-2 border-primary/20">
                {[t('provideWebsite'), t('improveExperience'), t('analyzeUsage'), t('rememberPreferences'), t('detectIssues')].map((item) => (
                  <li key={item} className="text-foreground/50 text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-headline font-black text-primary mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('yourRightsTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed mb-4">{t('yourRightsText')}</p>
              <ul className="space-y-2 pl-4 border-l-2 border-primary/20">
                {[t('accessInfo'), t('correctInfo'), t('deleteInfo'), t('objectProcessing'), t('withdrawConsent')].map((item) => (
                  <li key={item} className="text-foreground/50 text-sm leading-relaxed">{item}</li>
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
                <h2 className="font-headline font-black text-primary mb-5" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>{title}</h2>
                <p className="text-foreground/55 leading-relaxed">{content}</p>
              </section>
            ))}

            {/* Contact */}
            <section className="rounded-xl border border-primary/15 bg-primary/[0.03] p-8">
              <h2 className="font-headline font-black text-primary mb-4" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
                {t('contactTitle')}
              </h2>
              <p className="text-foreground/55 leading-relaxed">
                {t('contactText', { contactForm: 'contact form' }).split('contact form').map((part, i, arr) =>
                  i < arr.length - 1 ? <span key={i}>{part}<Link href="/contact" className="text-primary hover:text-primary/80 underline underline-offset-2">contact form</Link></span> : part
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
