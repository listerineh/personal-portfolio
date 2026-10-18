import { metadataFor } from '@/lib/metadata';
import { PageShell } from '@/components/layout';
import { AboutContent } from '@/components/sections/about-content';

export const generateMetadata = metadataFor('about');

export default function AboutPage() {
  return (
    <PageShell>
      <AboutContent />
    </PageShell>
  );
}
