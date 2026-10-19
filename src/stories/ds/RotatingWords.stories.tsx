import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RotatingWords } from '@/components/ds/RotatingWords';

const meta: Meta<typeof RotatingWords> = {
  title: 'DS/RotatingWords',
  component: RotatingWords,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { words: ['AI agents', 'cloud platforms', 'web products', 'developer tools'], interval: 2 },
};

export default meta;
type Story = StoryObj<typeof RotatingWords>;

/** The slot is as wide as the longest word, so the sentence never jumps. */
export const InSentence: Story = {
  render: (args) => (
    <p className="text-[clamp(1.75rem,5vw,3.75rem)] font-semibold tracking-[-0.04em] text-muted-foreground">
      I build <RotatingWords {...args} className="text-primary" />
    </p>
  ),
};
