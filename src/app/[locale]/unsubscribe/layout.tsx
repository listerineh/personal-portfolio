import type { Metadata } from 'next';
import { requestLocale } from '@/lib/metadata';

// Personal links land here (email + token in the query): keep it out of search results.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  return {
    title: locale === 'es' ? 'Darse de baja' : 'Unsubscribe',
    robots: { index: false, follow: false },
  };
}

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
