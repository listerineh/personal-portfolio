import { metadataFor } from '@/lib/metadata';
import { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const generateMetadata = metadataFor('why');

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
