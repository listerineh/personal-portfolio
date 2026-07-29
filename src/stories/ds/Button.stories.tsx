import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ds/Button';

const meta: Meta<typeof Button> = {
  title: 'DS/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    accent: 'neutral',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    accent: 'neutral',
    size: 'md',
    children: 'Ghost Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'sm',
    children: 'Small Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'md',
    children: 'Button with Icon',
  },
};
