import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Vinyl } from '@/components/ds/Vinyl';
import { Equalizer } from '@/components/ds/Equalizer';

const meta: Meta<typeof Vinyl> = {
  title: 'DS/Vinyl',
  component: Vinyl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { color: '#D97706', spinning: true },
};

export default meta;
type Story = StoryObj<typeof Vinyl>;

/** Spins slowly; hover the parent group to speed it up. Motion needs html.js-motion. */
export const Record: Story = {
  render: (args) => (
    <div className="stage group grid place-items-center gap-8 rounded-xl p-12">
      <Vinyl {...args} className="w-56" />
      <Equalizer bars={14} className="h-12" />
    </div>
  ),
};
