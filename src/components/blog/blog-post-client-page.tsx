
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ShareButtons } from './share-buttons';
import { BlogStructuredData } from '@/components/blog/blog-structured-data';
import { ArticleSchema } from '@/components/blog/article-schema';
import { BlogViews } from './blog-views';
import { BlogReactions } from './blog-reactions';
import { TableOfContents } from './table-of-contents';
import { CodeBlockCopyButton } from './code-block-copy-button';
import { NewsletterSubscribe } from './newsletter-subscribe';
import { RelatedPosts } from '@/components/common/related-posts';
import { NewsletterSignup } from '@/components/common/newsletter-signup';
import { ArrowLeft, CalendarDays, UserCircle, Tag, Clock } from 'lucide-react';
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time';
import { getBlogImageBlur } from '@/lib/image-blur';
import { getBlogPost } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogPostClientPageProps {
  post: BlogPost;
}

export function BlogPostClientPage({ post: initialPost }: BlogPostClientPageProps) {
  const { locale } = useLocale();
  const t = useTranslations('blog');
  
  // Obtener el post en el idioma correcto basado en el locale actual
  const post = useMemo(() => {
    const localizedPost = getBlogPost(initialPost.slug, locale);
    return localizedPost || initialPost;
  }, [initialPost.slug, locale]);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const proseRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!contentRef.current) {
            ticking = false;
            return;
          }

          const element = contentRef.current;
          const { top } = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollDepth = window.scrollY - element.offsetTop;
          const totalScrollableHeight = element.scrollHeight - viewportHeight;

          if (totalScrollableHeight <= 0) {
            if (top < viewportHeight) {
              setReadingProgress(100);
            } else {
              setReadingProgress(0);
            }
            ticking = false;
            return;
          }

          const progress = (scrollDepth / totalScrollableHeight) * 100;
          setReadingProgress(Math.min(100, Math.max(0, progress)));
          
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (proseRef.current) {
      const headings = proseRef.current.querySelectorAll('h2, h3');
      
      headings.forEach((heading, index) => {
        const text = heading.textContent || '';
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
        heading.id = id || `heading-${index}`;
      });
    }
  }, [post.content]);

  useEffect(() => {
    const handleAsideVisibility = () => {
      if (!asideRef.current) return;

      const footer = document.querySelector('footer');
      if (!footer) {
        gsap.to(asideRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: 'auto',
        });
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const asideRect = asideRef.current.getBoundingClientRect();

      if (asideRect.bottom > footerRect.top) {
        gsap.to(asideRef.current, {
          opacity: 0,
          duration: 0.3,
          pointerEvents: 'none',
        });
      } else {
        gsap.to(asideRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: 'auto',
        });
      }
    };

    window.addEventListener('scroll', handleAsideVisibility);
    handleAsideVisibility();

    return () => {
      window.removeEventListener('scroll', handleAsideVisibility);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      if (headerRef.current && headerRef.current.children.length > 0) {
        const isLowEnd = (navigator as any).hardwareConcurrency <= 2;
        gsap.fromTo(headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: isLowEnd ? 0.4 : 0.6,
            ease: 'power2.out',
          }
        );
      }

      if (imageRef.current) {
        const isLowEnd = (navigator as any).hardwareConcurrency <= 2;
        gsap.to(imageRef.current, {
          y: 60,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: isLowEnd ? 0 : 1,
          },
        });
      }

      if (proseRef.current) {
        const paragraphs = proseRef.current.querySelectorAll('p');
        const headings = proseRef.current.querySelectorAll('h2, h3');
        const lists = proseRef.current.querySelectorAll('ul, ol');
        const blockquotes = proseRef.current.querySelectorAll('blockquote');
        const codeBlocks = proseRef.current.querySelectorAll('pre');
        
        const isLowEnd = (navigator as any).hardwareConcurrency <= 2;
        const baseDuration = isLowEnd ? 0.3 : 0.5;

        paragraphs.forEach((paragraph) => {
          gsap.fromTo(paragraph,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: baseDuration,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: paragraph,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        headings.forEach((heading) => {
          gsap.fromTo(heading,
            { scale: 0.95, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: baseDuration,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        lists.forEach((list) => {
          const items = list.querySelectorAll('li');
          gsap.fromTo(items,
            { x: -15, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.05,
              duration: baseDuration * 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: list,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        blockquotes.forEach((blockquote) => {
          gsap.fromTo(blockquote,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: baseDuration,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: blockquote,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        codeBlocks.forEach((codeBlock) => {
          gsap.fromTo(codeBlock,
            { scale: 0.98, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: baseDuration,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: codeBlock,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [post.slug]);

  return (
    <>
      <BlogStructuredData post={post} />
      <ArticleSchema post={post} />
      <Header />
      <aside ref={asideRef} className="hidden xl:block xl:fixed xl:right-4 xl:top-24 xl:w-[280px] xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:z-40 xl:pointer-events-auto">
        <div className="pr-2">
          <TableOfContents content={post.content} />
        </div>
      </aside>
      <main className="pt-20 bg-background">
        <Progress value={readingProgress} className="fixed top-20 left-0 right-0 h-1 z-50 rounded-none bg-primary/20 transition-all duration-150" />
        <div className="container mx-auto px-4 py-12 md:py-16 xl:mr-[320px]">
          <div className="relative max-w-7xl mx-auto">
            <article key={post.slug} ref={contentRef} className="max-w-4xl">
          <header ref={headerRef} className="mb-6 md:mb-12">
            <Button asChild variant="ghost" className="mb-4 md:mb-6 text-accent hover:text-primary pl-0">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('backToBlog')}
              </Link>
            </Button>
            <div className="flex flex-col gap-4 mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-headline font-bold text-primary leading-tight">
                {post.title}
              </h1>
              <div className="hidden md:block">
                <ShareButtons 
                  title={post.title} 
                  url={typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`} 
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-x-6 sm:gap-y-2 text-sm sm:text-base text-muted-foreground mb-4">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <UserCircle className="mr-2 h-5 w-5" />
                <span>{t('by')} {post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{formatReadingTime(post.readingTime || calculateReadingTime(post.content), locale)}</span>
              </div>
              <BlogViews slug={post.slug} />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal text-xs sm:text-sm px-2 sm:px-3 py-1">{tag}</Badge>
                  ))}
                </div>
              )}
              <div className="md:hidden">
                <ShareButtons 
                  title={post.title} 
                  url={typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`} 
                />
              </div>
            </div>
          </header>

          {post.imageUrl && (
            <div ref={imageRef} className="relative w-full h-48 sm:h-72 md:h-[500px] mb-8 md:mb-16 rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={post.imageAiHint || 'blog post header'}
                placeholder="blur"
                blurDataURL={getBlogImageBlur()}
                priority
              />
            </div>
          )}

          <Separator className="my-6 md:my-12" />

          <div
            ref={proseRef}
            className="prose prose-xl dark:prose-invert max-w-none 
                       prose-headings:font-headline prose-headings:text-primary prose-headings:mb-6 prose-headings:mt-12
                       prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                       prose-a:text-accent hover:prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-foreground prose-strong:font-semibold
                       prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic
                       prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-code prose-code:text-sm
                       prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
                       prose-pre:bg-muted prose-pre:p-6 prose-pre:rounded-xl prose-pre:font-code prose-pre:shadow-lg
                       prose-ul:my-6 prose-ol:my-6 prose-li:my-2
                       prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: marked(post.content) as string }}
          />

          <Separator className="my-8 md:my-12" />

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('whatDidYouThink')}</h3>
            <BlogReactions slug={post.slug} />
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col gap-4 mb-8">
            <p className="text-muted-foreground">{t('foundHelpful')}</p>
            <div className="w-full sm:w-auto">
              <ShareButtons 
                title={post.title} 
                url={typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`} 
              />
            </div>
          </div>

          <RelatedPosts currentSlug={post.slug} limit={3} />

          <Separator className="my-12" />

          <NewsletterSignup />

          <Separator className="my-12" />

          <div className="text-center">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('moreArticles')}
              </Link>
            </Button>
          </div>

            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
