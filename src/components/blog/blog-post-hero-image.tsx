'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import { getBlogImageBlur } from '@/lib/image-blur';

interface BlogPostHeroImageProps {
  imageUrl: string;
  title: string;
  imageAiHint?: string;
}

export const BlogPostHeroImage = forwardRef<HTMLDivElement, BlogPostHeroImageProps>(
  ({ imageUrl, title, imageAiHint }, ref) => {
    return (
      <div 
        ref={ref} 
        className="relative w-full h-48 sm:h-72 md:h-[500px] mb-8 md:mb-16 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
          style={{ objectFit: 'cover' }}
          data-ai-hint={imageAiHint || 'blog post header'}
          placeholder="blur"
          blurDataURL={getBlogImageBlur()}
          priority
        />
      </div>
    );
  }
);

BlogPostHeroImage.displayName = 'BlogPostHeroImage';
