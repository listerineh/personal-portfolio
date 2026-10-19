import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BlogReactions } from '@/components/blog/blog-reactions';

const meta: Meta<typeof BlogReactions> = {
  title: 'Blog/BlogReactions',
  component: BlogReactions,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { slug: 'storybook-sample' },
};

export default meta;
type Story = StoryObj<typeof BlogReactions>;

/** Counts come from the mocked /api/blog/[slug]/reactions route. A reaction is an aria-pressed toggle. */
export const Default: Story = {};
