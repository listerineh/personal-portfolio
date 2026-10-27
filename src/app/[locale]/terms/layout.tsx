import { metadataFor } from '@/lib/metadata';

export const generateMetadata = metadataFor('terms');

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
