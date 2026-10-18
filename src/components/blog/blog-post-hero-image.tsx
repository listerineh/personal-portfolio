'use client';

import Image from 'next/image';
import { getBlogImageBlur } from '@/lib/image-blur';

interface BlogPostHeroImageProps {
  imageUrl: string;
  title: string;
  imageAiHint?: string;
}

/** The article's print, framed and hung above the text. */
export function BlogPostHeroImage({ imageUrl, title, imageAiHint }: BlogPostHeroImageProps) {
  return (
    <div className="mb-12 overflow-hidden rounded-xl shadow-card md:mb-16">
      <Image
        src={imageUrl}
        alt={title}
        width={1200}
        height={630}
        sizes="(max-width: 1024px) 100vw, 860px"
        style={{ width: '100%', height: 'auto' }}
        data-ai-hint={imageAiHint || 'blog post header'}
        placeholder="blur"
        blurDataURL={getBlogImageBlur()}
        priority
      />
    </div>
  );
}
