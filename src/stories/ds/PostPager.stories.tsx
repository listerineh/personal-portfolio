import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PostPager } from '@/components/ds/PostPager';

const labels = { previous: 'Previous article', next: 'Next article', nav: 'More articles' };

const meta: Meta<typeof PostPager> = {
  title: 'DS/PostPager',
  component: PostPager,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    labels,
    previous: { href: '/blog/terraform-scaling-infrastructure', title: 'Terraform: Scaling Infrastructure Without Breaking the Bank' },
    next: { href: '/blog/python-renaissance-ai-era', title: 'The Python Renaissance in the AI Era' },
  },
};

export default meta;
type Story = StoryObj<typeof PostPager>;

/** Older on the left, newer on the right; stacked on phones. */
export const Both: Story = {};

/** The newest post: only the way back. Its panel keeps the left column. */
export const OnlyPrevious: Story = { args: { next: undefined } };

/** The oldest post: only the way forward, still on the right. */
export const OnlyNext: Story = { args: { previous: undefined } };
