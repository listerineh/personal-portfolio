import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BackToTopButton } from '@/components/common/back-to-top-button';

const meta: Meta<typeof BackToTopButton> = {
  title: 'Common/BackToTopButton',
  component: BackToTopButton,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BackToTopButton>;

/** Appears after scrolling past the first rooms (800px). Scroll the canvas to see it. */
export const Default: Story = {
  render: () => (
    <div className="min-h-[300vh] p-8">
      <p className="text-muted-foreground">Scroll down.</p>
      <BackToTopButton />
    </div>
  ),
};
