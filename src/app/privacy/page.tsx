import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sebastian Alvarez',
  description: 'Privacy policy and data protection information for listerineh.dev',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Introduction</h2>
              <p className="text-foreground mb-4">
                This Privacy Policy explains how Sebastian Alvarez ("I", "me", or "my") collects, uses, and protects 
                your personal information when you visit listerineh.dev (the "Website").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Information I Collect</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Automatically Collected Information</h3>
              <p className="text-foreground mb-4">
                When you visit the Website, I automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3">Cookies and Similar Technologies</h3>
              <p className="text-foreground mb-4">
                I use cookies and similar tracking technologies to enhance your experience. You can control cookie 
                preferences through the cookie banner or the <Link href="/" className="text-accent hover:text-primary underline">Cookie Settings</Link> link 
                in the footer.
              </p>
              
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">Types of Cookies:</p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li><strong>Necessary Cookies:</strong> Essential for website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help understand how visitors use the site (Vercel Analytics)</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings (e.g., theme preference)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">How I Use Your Information</h2>
              <p className="text-foreground mb-4">I use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>Provide and maintain the Website</li>
                <li>Improve user experience and website functionality</li>
                <li>Analyze website usage and trends</li>
                <li>Remember your preferences (with your consent)</li>
                <li>Detect and prevent technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Third-Party Services</h2>
              <p className="text-foreground mb-4">
                I use the following third-party services that may collect information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li><strong>Vercel Analytics:</strong> Website analytics (only if you accept analytics cookies)</li>
                <li><strong>Vercel Hosting:</strong> Website hosting and content delivery</li>
              </ul>
              <p className="text-foreground mb-4">
                These services have their own privacy policies governing their use of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Data Retention</h2>
              <p className="text-foreground mb-4">
                Cookie consent preferences are stored for 365 days. Analytics data is retained according to 
                Vercel's data retention policy. You can revoke consent at any time through Cookie Settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Your Rights</h2>
              <p className="text-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>Access the personal information I hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent for cookies at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Children's Privacy</h2>
              <p className="text-foreground mb-4">
                This Website is not intended for children under 13 years of age. I do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Changes to This Policy</h2>
              <p className="text-foreground mb-4">
                I may update this Privacy Policy from time to time. The updated version will be indicated by an 
                updated "Last updated" date at the top of this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Contact</h2>
              <p className="text-foreground mb-4">
                If you have questions about this Privacy Policy, please contact me through the{' '}
                <Link href="/#contact" className="text-accent hover:text-primary underline">contact form</Link> on the website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
