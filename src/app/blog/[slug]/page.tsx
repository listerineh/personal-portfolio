
import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { BlogPostClientPage } from '@/components/blog/blog-post-client-page';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
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
    return {
      title: 'Post Not Found' 
    };
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

  return <BlogPostClientPage post={post} />;
}
