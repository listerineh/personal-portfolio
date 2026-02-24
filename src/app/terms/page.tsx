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
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('agreementTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('agreementText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('licenseTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('licenseText')}
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('licenseNotAllowedTitle')}</h3>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>{t('modifyMaterials')}</li>
                <li>{t('commercialUse')}</li>
                <li>{t('reverseEngineer')}</li>
                <li>{t('removeCopyright')}</li>
                <li>{t('transferMaterials')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('blogContentTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('blogContentText')}
              </p>
              
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">{t('codeExamplesLabel')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('codeExamplesText')}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('disclaimerTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('disclaimerText1')}
              </p>
              <p className="text-foreground mb-4">
                {t('disclaimerText2')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('limitationsTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('limitationsText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('externalLinksTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('externalLinksText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('userCommentsTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('userCommentsText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('intellectualPropertyTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('intellectualPropertyText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('modificationsTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('modificationsText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('governingLawTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('governingLawText')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">{t('contactInfoTitle')}</h2>
              <p className="text-foreground mb-4">
                {t('contactInfoText', {
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

            <section className="mb-8">
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                <p className="text-sm text-foreground">
                  <strong>{t('noteLabel')}</strong> {t('noteText', {
                    privacyPolicy: 'Privacy Policy'
                  }).split('Privacy Policy').map((part, index, array) => (
                    index < array.length - 1 ? (
                      <span key={index}>
                        {part}
                        <Link href="/privacy" className="text-accent hover:text-primary underline">
                          Privacy Policy
                        </Link>
                      </span>
                    ) : part
                  ))}
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
