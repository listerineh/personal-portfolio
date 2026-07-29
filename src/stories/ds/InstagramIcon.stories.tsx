import type { Meta, StoryObj } from '@storybook/react';
import { InstagramIcon } from '@/components/ds/InstagramIcon';

const meta: Meta<typeof InstagramIcon> = {
  title: 'DS/InstagramIcon',
  component: InstagramIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InstagramIcon>;

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

export const ExtraLarge: Story = {
  args: {
    className: 'w-16 h-16',
  },
};
