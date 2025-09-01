
"use client";

import { useState, useEffect, useRef } from 'react';
import type { BlogPost } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArrowLeft, CalendarDays, UserCircle, Tag } from 'lucide-react';

interface BlogPostClientPageProps {
  post: BlogPost;
}

export function BlogPostClientPage({ post }: BlogPostClientPageProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

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
        return;
      }

      const progress = (scrollDepth / totalScrollableHeight) * 100;

      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post]);

  return (
    <>
      <Header />
      <main className="pt-20 bg-background">
        <Progress value={readingProgress} className="fixed top-20 left-0 right-0 h-1 z-50 rounded-none bg-primary/20 transition-all duration-150" />
        <article ref={contentRef} className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <header className="mb-8 md:mb-12">
            <Button asChild variant="ghost" className="mb-6 text-accent hover:text-primary pl-0">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <CalendarDays className="mr-1.5 h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <UserCircle className="mr-1.5 h-4 w-4" />
                <span>By {post.author}</span>
              </div>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Tag className="mr-1.5 h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
              </div>
            )}
          </header>

          {post.imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 md:mb-12 rounded-lg overflow-hidden shadow-md">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                objectFit="cover"
                data-ai-hint={post.imageAiHint || 'blog post header'}
                priority
              />
            </div>
          )}

          <Separator className="my-6 md:my-8" />

          <div
            className="prose prose-lg dark:prose-invert max-w-none 
                       prose-headings:font-headline prose-headings:text-primary 
                       prose-p:text-foreground prose-a:text-accent hover:prose-a:text-primary
                       prose-strong:text-foreground prose-blockquote:border-accent
                       prose-code:bg-transparent  prose-code:rounded-md prose-code:font-code
                       prose-code:text-black dark:prose-code:text-white
                       prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:font-code"
            dangerouslySetInnerHTML={{ __html: marked(post.content) as string }}
          />

          <Separator className="my-8 md:my-12" />

          <div className="text-center">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> More Articles
              </Link>
            </Button>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
