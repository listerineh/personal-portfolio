
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';
import { CalendarDays, UserCircle, Tag, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { Header, Footer } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | Sebastian Alvarez Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.imageUrl,
          alt: `${post.excerpt} blog by ${post.author}`,
        },
      ],
    },
    twitter: {
      card: 'blog_post_large_image',
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.imageUrl,
          alt: `${post.excerpt} blog by ${post.author}`,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-20 bg-background">
        <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <header className="mb-8 md:mb-12">
            <Button asChild variant="link" className="mb-6 text-accent pl-0">
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
                data-ai-hint={post.imageAiHint || 'blog post header'}
                priority
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover"
                }} />
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
