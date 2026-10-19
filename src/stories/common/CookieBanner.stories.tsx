import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CookieBanner } from '@/components/common/cookie-banner';

const meta: Meta<typeof CookieBanner> = {
  title: 'Common/CookieBanner',
  component: CookieBanner,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CookieBanner>;

/** Floating panel pinned to the bottom edge. Shows while no consent cookie exists; clear cookies to see it again. */
export const Default: Story = {
  render: () => (
    <div className="min-h-[60vh] p-8">
      <p className="text-muted-foreground">Page content.</p>
      <CookieBanner />
    </div>
  ),
};
