import type { Meta, StoryObj } from '@storybook/react';
import { SpotifyIcon } from '@/components/ds/SpotifyIcon';

const meta: Meta<typeof SpotifyIcon> = {
  title: 'DS/SpotifyIcon',
  component: SpotifyIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpotifyIcon>;

export const Default: Story = {
  args: {
    className: 'w-8 h-8',
  },
};

export const Small: Story = {
  args: {
    className: 'w-4 h-4',
  },
};

export const Large: Story = {
  args: {
    className: 'w-12 h-12',
  },
};

export const Base: Story = {
  args: {
    className: 'w-8 h-8',
    base: true,
  },
};

export const AdaptiveOnLightText: Story = {
  render: (args) => (
    <div className="p-4 rounded-xl bg-white text-black">
      <SpotifyIcon {...args} />
    </div>
  ),
  args: {
    className: 'w-8 h-8',
  },
};

export const AdaptiveOnDarkText: Story = {
  render: (args) => (
    <div className="p-4 rounded-xl bg-black text-white">
      <SpotifyIcon {...args} />
    </div>
  ),
  args: {
    className: 'w-8 h-8',
  },
};

export const CutOutOnSolidButton: Story = {
  render: (args) => (
    <div className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-black" style={{ backgroundColor: '#818cf8' }}>
      <SpotifyIcon {...args} />
      Listen on Spotify
    </div>
  ),
  args: {
    className: 'w-4 h-4',
    linesColor: '#818cf8',
  },
};
