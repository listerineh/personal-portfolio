import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NewsletterSubscribe } from '@/components/blog/newsletter-subscribe';

const meta: Meta<typeof NewsletterSubscribe> = {
  title: 'Blog/NewsletterSubscribe',
  component: NewsletterSubscribe,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NewsletterSubscribe>;

/** A plaque notice pinned between written works. Submitting hits the mocked subscribe route. */
export const Default: Story = { args: { variant: 'default' } };

export const Compact: Story = { args: { variant: 'compact' } };

/** Just the form, for hosts that supply their own frame. */
export const Bare: Story = {
  args: { variant: 'bare' },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
};
