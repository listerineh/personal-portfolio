import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Sebastian Alvarez',
  description: 'Terms of use and conditions for listerineh.dev',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
            Terms of Use
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Agreement to Terms</h2>
              <p className="text-foreground mb-4">
                By accessing and using listerineh.dev (the "Website"), you accept and agree to be bound by the 
                terms and conditions of this agreement. If you do not agree to these terms, please do not use the Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Use License</h2>
              <p className="text-foreground mb-4">
                Permission is granted to temporarily access the materials (information, blog posts, code examples) 
                on the Website for personal, non-commercial viewing only.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">This license does NOT allow you to:</h3>
              <ul className="list-disc pl-6 mb-4 text-foreground space-y-2">
                <li>Modify or copy the materials without attribution</li>
                <li>Use the materials for commercial purposes without permission</li>
                <li>Attempt to reverse engineer any software on the Website</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" on another server</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Blog Content and Code Examples</h2>
              <p className="text-foreground mb-4">
                All blog posts, articles, and written content on this Website are original works by Sebastian Alvarez 
                unless otherwise stated.
              </p>
              
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">Code Examples:</p>
                <p className="text-sm text-muted-foreground">
                  Code snippets and examples shared in blog posts are provided for educational purposes. 
                  You may use them in your projects with proper attribution. No warranty is provided for their use.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Disclaimer</h2>
              <p className="text-foreground mb-4">
                The materials on the Website are provided on an 'as is' basis. I make no warranties, expressed or 
                implied, and hereby disclaim all other warranties including, without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual 
                property or other violation of rights.
              </p>
              <p className="text-foreground mb-4">
                I do not warrant or make any representations concerning the accuracy, likely results, or reliability 
                of the use of the materials on the Website or otherwise relating to such materials or on any sites 
                linked to this Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Limitations</h2>
              <p className="text-foreground mb-4">
                In no event shall Sebastian Alvarez or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the 
                use or inability to use the materials on the Website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">External Links</h2>
              <p className="text-foreground mb-4">
                The Website may contain links to external websites that are not provided or maintained by me. 
                I do not guarantee the accuracy, relevance, timeliness, or completeness of any information on 
                these external websites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">User Comments and Contributions</h2>
              <p className="text-foreground mb-4">
                If you submit any content, feedback, or suggestions through the contact form or other means, 
                you grant me a non-exclusive, worldwide, royalty-free license to use, reproduce, and publish 
                such content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Intellectual Property</h2>
              <p className="text-foreground mb-4">
                All content on this Website, including but not limited to text, graphics, logos, images, and 
                software, is the property of Sebastian Alvarez and is protected by international copyright laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Modifications</h2>
              <p className="text-foreground mb-4">
                I may revise these Terms of Use at any time without notice. By using this Website, you agree to 
                be bound by the current version of these Terms of Use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Governing Law</h2>
              <p className="text-foreground mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of your 
                jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Contact Information</h2>
              <p className="text-foreground mb-4">
                If you have any questions about these Terms of Use, please contact me through the{' '}
                <Link href="/#contact" className="text-accent hover:text-primary underline">contact form</Link>.
              </p>
            </section>

            <section className="mb-8">
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> By continuing to use this Website, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Use and the{' '}
                  <Link href="/privacy" className="text-accent hover:text-primary underline">Privacy Policy</Link>.
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
