'use client';

import { useRef, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogPosts } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogListingPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Limpiar ScrollTriggers previos
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animación del título
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }

    // Animación de las cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Hover effects solo en desktop
      const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      
      if (!isTouchDevice) {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 md:py-24 bg-background/10">
          <div className="container mx-auto px-4">
            <h1 ref={titleRef} className="text-4xl md:text-5xl font-headline font-bold mb-12 md:mb-16 text-center text-primary">
              My Dev Blog
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
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
                        className="transition-transform duration-300 group-hover:scale-105"
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
