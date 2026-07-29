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

export const CustomColor: Story = {
  args: {
    className: 'w-8 h-8',
    accentColor: '#ff6b6b',
  },
};

export const Green: Story = {
  args: {
    className: 'w-8 h-8',
    accentColor: '#1DB954',
  },
};

export const Amber: Story = {
  args: {
    className: 'w-8 h-8',
    accentColor: '#f59e0b',
  },
};
