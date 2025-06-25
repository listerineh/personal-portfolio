import Image from "next/image";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function BlogListingPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 md:py-24 bg-background/10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-12 md:mb-16 text-center text-primary">
              My Dev Blog
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {post.imageUrl && (
                    <div className="relative w-full h-48">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        data-ai-hint={post.imageAiHint || 'blog post image'}
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
