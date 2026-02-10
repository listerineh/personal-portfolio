'use client';

import { useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time';
import { getBlogImageBlur } from '@/lib/image-blur';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogPosts } from '@/lib/data';
import { SectionWrapper } from '@/components/common';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGSAP } from '@/hooks/use-gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BlogPreviewSection() {
  const displayedPosts = blogPosts.slice(0, 3);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        const image = card.querySelector('.blog-image');
        if (image) {
          gsap.to(image, {
            y: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    });

    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, [displayedPosts.length]);

  return (
    <SectionWrapper id="blog" title="Latest Thoughts" className="bg-gradient-to-t from-background via-background/90 to-background/0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post, index) => (
          <article
            key={post.slug}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group relative"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Card */}
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <Card className="relative overflow-hidden bg-gradient-to-br from-card/70 via-card/50 to-card/70 backdrop-blur-sm border-border/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-40 pointer-events-none" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }} />
                
                {/* Image container */}
                {post.imageUrl && (
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      data-ai-hint={post.imageAiHint || 'blog post image'}
                      className="blog-image transition-transform duration-500 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={getBlogImageBlur()}
                      style={{
                        objectFit: "cover"
                      }} />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60" />
                  </div>
                )}
                
                {/* Content */}
                <div className="relative flex flex-col flex-grow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-headline font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <time dateTime={post.date}>{post.date}</time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{formatReadingTime(post.readingTime || calculateReadingTime(post.content))}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow pb-4">
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter className="pt-4 border-t border-border/30">
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardFooter>
                </div>
                
                {/* Corner highlights */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/10 to-transparent rounded-bl-xl pointer-events-none" />
              </Card>
            </Link>
          </article>
        ))}
      </div>
      {blogPosts.length > 3 && (
         <div ref={buttonRef} className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-lg transition-all">
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
      )}
    </SectionWrapper>
  );
}
