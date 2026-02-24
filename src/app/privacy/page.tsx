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
      <main className="pt-20 pb-16">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t('lastUpdated')} {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('introTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('introText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('infoCollectTitle')}</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('autoCollectedTitle')}</h3>
              <p className="text-foreground mb-4">
                {t('autoCollectedText')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>{t('browserType')}</li>
                <li>{t('operatingSystem')}</li>
                <li>{t('ipAddress')}</li>
                <li>{t('pagesVisited')}</li>
                <li>{t('referringWebsite')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">{t('cookiesTitle')}</h3>
              <p className="text-foreground mb-4">
                {t('cookiesText', {
                  cookieSettings: 'cookie settings'
                }).split('cookie settings').map((part, index, array) => (
                  index < array.length - 1 ? (
                    <span key={index}>
                      {part}
                      <Link href="/" className="text-accent hover:text-primary underline">
                        cookie settings
                      </Link>
                    </span>
                  ) : part
                ))}
              </p>
              
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">{t('cookieTypesLabel')}</p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li><strong>{t('necessaryCookies')}</strong> {t('necessaryCookiesDesc')}</li>
                  <li><strong>{t('analyticsCookies')}</strong> {t('analyticsCookiesDesc')}</li>
                  <li><strong>{t('preferenceCookies')}</strong> {t('preferenceCookiesDesc')}</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('howUseTitle')}</h2>
              <p className="text-foreground mb-4">{t('howUseText')}</p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>{t('provideWebsite')}</li>
                <li>{t('improveExperience')}</li>
                <li>{t('analyzeUsage')}</li>
                <li>{t('rememberPreferences')}</li>
                <li>{t('detectIssues')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('thirdPartyTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('thirdPartyText')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li><strong>{t('vercelAnalytics')}</strong> {t('vercelAnalyticsDesc')}</li>
                <li><strong>{t('vercelHosting')}</strong> {t('vercelHostingDesc')}</li>
              </ul>
              <p className="text-foreground mb-4">
                {t('thirdPartyPolicies')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('dataRetentionTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('dataRetentionText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('yourRightsTitle')}</h2>
              <p className="text-foreground mb-4">{t('yourRightsText')}</p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>{t('accessInfo')}</li>
                <li>{t('correctInfo')}</li>
                <li>{t('deleteInfo')}</li>
                <li>{t('objectProcessing')}</li>
                <li>{t('withdrawConsent')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('childrenTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('childrenText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('changesTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('changesText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('contactTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('contactText', {
                  contactForm: 'contact form'
                }).split('contact form').map((part, index, array) => (
                  index < array.length - 1 ? (
                    <span key={index}>
                      {part}
                      <Link href="/#contact" className="text-accent hover:text-primary underline">
                        contact form
                      </Link>
                    </span>
                  ) : part
                ))}
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
