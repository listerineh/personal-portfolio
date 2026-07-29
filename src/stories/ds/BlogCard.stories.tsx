import type { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from '@/components/ds/BlogCard';

const meta: Meta<typeof BlogCard> = {
  title: 'DS/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
  args: {
    title: 'Building Scalable Microservices with Next.js',
    slug: 'building-scalable-microservices',
    excerpt: 'Learn how to architect and implement microservices using Next.js API routes, Docker, and Kubernetes for production-ready applications.',
    date: 'January 15, 2024',
    tags: ['Next.js', 'Microservices', 'Docker'],
    coverImage: '/images/hero-photo.webp',
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Advanced TypeScript Patterns for React Developers',
    slug: 'advanced-typescript-patterns',
    excerpt: 'Explore advanced TypeScript patterns and techniques that will level up your React development skills.',
    date: 'December 20, 2023',
    tags: ['TypeScript', 'React', 'Patterns'],
  },
};

export const NewPost: Story = {
  args: {
    title: 'Getting Started with AI in Web Development',
    slug: 'getting-started-ai-web-dev',
    excerpt: 'A comprehensive guide to integrating AI capabilities into your web applications using modern APIs and frameworks.',
    date: 'July 29, 2026',
    tags: ['AI', 'Web Development', 'APIs'],
    coverImage: '/images/sebastian_alvarez_photo.webp',
    newLabel: 'New',
  },
};

export const Recommended: Story = {
  args: {
    title: 'Optimizing React Performance with Memoization',
    slug: 'optimizing-react-performance',
    excerpt: 'Deep dive into React.memo, useMemo, and useCallback to optimize your React applications for maximum performance.',
    date: 'June 10, 2024',
    tags: ['React', 'Performance', 'Optimization'],
    coverImage: '/images/footer-photo.webp',
    isRecommended: true,
    recommendedLabel: 'Recommended',
  },
};

export const ManyTags: Story = {
  args: {
    title: 'Full Stack Development Best Practices',
    slug: 'full-stack-best-practices',
    excerpt: 'Comprehensive guide to building full-stack applications with modern tools and methodologies.',
    date: 'May 5, 2024',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    coverImage: '/images/hero-photo.webp',
  },
};

export const CustomLabels: Story = {
  args: {
    title: 'Modern CSS Techniques for 2024',
    slug: 'modern-css-techniques',
    excerpt: 'Explore the latest CSS features and techniques that will transform your styling workflow.',
    date: 'April 15, 2024',
    tags: ['CSS', 'Frontend', 'Styling'],
    coverImage: '/images/sebastian_alvarez_photo.webp',
    readMoreLabel: 'Continue reading',
    newLabel: 'Fresh',
  },
};

export const Minimal: Story = {
  args: {
    title: 'Quick Tips for Better Code',
    slug: 'quick-tips-better-code',
    date: 'March 1, 2024',
    tags: ['Tips', 'Code Quality'],
  },
};
