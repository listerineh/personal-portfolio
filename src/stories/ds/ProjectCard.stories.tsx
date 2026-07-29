import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '@/components/ds/ProjectCard';

const meta: Meta<typeof ProjectCard> = {
  title: 'DS/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    slug: 'openstage',
    title: 'OpenStage',
    description: 'A modern music collaboration platform that connects artists worldwide with real-time collaboration tools and AI-powered music production features.',
    imageUrl: '/images/hero-photo.webp',
    tags: ['Next.js', 'React', 'TypeScript', 'AI', 'WebRTC'],
  },
};

export const WithoutImage: Story = {
  args: {
    slug: 'cli-tool',
    title: 'CLI Tool',
    description: 'A powerful command-line interface tool for automating development workflows and improving productivity.',
    tags: ['Node.js', 'CLI', 'Automation'],
  },
};

export const ManyTags: Story = {
  args: {
    slug: 'fullstack-app',
    title: 'Full Stack Application',
    description: 'Comprehensive full-stack application with authentication, real-time features, and scalable architecture.',
    imageUrl: '/images/footer-photo.webp',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'GraphQL'],
  },
};

export const MinimalTags: Story = {
  args: {
    slug: 'simple-project',
    title: 'Simple Project',
    description: 'A minimal project demonstrating core concepts and best practices.',
    imageUrl: '/images/sebastian_alvarez_photo.webp',
    tags: ['React'],
  },
};

export const CustomLabel: Story = {
  args: {
    slug: 'portfolio-site',
    title: 'Portfolio Site',
    description: 'Personal portfolio website showcasing projects and skills with modern design.',
    imageUrl: '/images/hero-photo.webp',
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    viewMoreLabel: 'View details',
  },
};

export const LongDescription: Story = {
  args: {
    slug: 'complex-platform',
    title: 'Complex Platform',
    description: 'An enterprise-grade platform with multiple modules including user management, content delivery, analytics dashboard, and third-party integrations. Built with scalability and performance in mind.',
    imageUrl: '/images/footer-photo.webp',
    tags: ['Microservices', 'Kubernetes', 'Go', 'React'],
  },
};
