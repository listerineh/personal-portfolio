'use client';

import { useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
          <Card 
            key={post.slug} 
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {post.imageUrl && (
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  data-ai-hint={post.imageAiHint || 'blog post image'}
                  className="blog-image transition-transform duration-300 group-hover:scale-105"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover"
                  }} />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-headline hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground pt-1">
                <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> {post.date} by {post.author}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="text-accent p-0 hover:text-primary">
                <Link href={`/blog/${post.slug}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {blogPosts.length > 3 && (
         <div ref={buttonRef} className="text-center mt-12">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/blog">
                View All Posts
              </Link>
            </Button>
          </div>
      )}
    </SectionWrapper>
  );
}
