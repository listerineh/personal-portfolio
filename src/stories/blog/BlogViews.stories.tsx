import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BlogViews } from '@/components/blog/blog-views';

const meta: Meta<typeof BlogViews> = {
  title: 'Blog/BlogViews',
  component: BlogViews,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { slug: 'storybook-sample' },
};

export default meta;
type Story = StoryObj<typeof BlogViews>;

/** Catalog line with the view count from the mocked /api/blog/[slug]/views route. */
export const Default: Story = {};
