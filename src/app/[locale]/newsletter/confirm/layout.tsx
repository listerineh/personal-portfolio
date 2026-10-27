import type { Metadata } from 'next';
import { requestLocale } from '@/lib/metadata';

// Personal links land here (email + signed token in the query): keep it out of search results.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  return {
    title: locale === 'es' ? 'Confirmar suscripción' : 'Confirm subscription',
    robots: { index: false, follow: false },
  };
}

export default function NewsletterConfirmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
