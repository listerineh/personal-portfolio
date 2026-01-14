'use client';

import { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time';
import { getBlogImageBlur } from '@/lib/image-blur';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogPosts } from '@/lib/data';
import { BlogSearch } from '@/components/blog/blog-search';
import { NewsletterSubscribe } from '@/components/blog/newsletter-subscribe';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { BlogPost } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogListingPage() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const rssButtonRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

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

    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          ease: 'power3.out',
        }
      );
    }

    if (rssButtonRef.current) {
      gsap.fromTo(rssButtonRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.15,
          ease: 'back.out(1.7)',
        }
      );
    }

    if (searchRef.current) {
      gsap.fromTo(searchRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.25,
          ease: 'power3.out',
        }
      );
    }

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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 md:py-24 bg-background/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 ref={titleRef} className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
                My Dev Blog
              </h1>
              <p ref={descriptionRef} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Technical articles about software engineering, cloud infrastructure, and modern web development
              </p>
            </div>
            
            <div ref={searchRef} className="max-w-3xl mx-auto mb-12">
              <BlogSearch posts={blogPosts} onFilteredPostsChange={setFilteredPosts} />
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No articles found matching your search.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.slug}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="group relative"
                  >
                    {/* Ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Card */}
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <Card className="relative overflow-hidden bg-gradient-to-br from-card/70 via-card/50 to-card/70 backdrop-blur-xl border-border/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
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
                              className="transition-transform duration-500 group-hover:scale-110"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                                <span>{post.date}</span>
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
                  </div>
              ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
