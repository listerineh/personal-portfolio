import { metadataFor } from '@/lib/metadata';

export const generateMetadata = metadataFor('privacy');

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
