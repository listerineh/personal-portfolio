import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/common/section-wrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import { ArrowRight, CalendarDays } from 'lucide-react';

export function BlogPreviewSection() {
  const displayedPosts = blogPosts.slice(0, 3);

  return (
    <SectionWrapper id="blog" title="Latest Thoughts" className="bg-gradient-to-t from-background via-background/90 to-background/0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {post.imageUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={post.imageAiHint || 'blog post image'}
                />
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
         <div className="text-center mt-12">
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
