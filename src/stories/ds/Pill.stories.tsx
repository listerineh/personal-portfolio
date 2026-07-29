import type { Meta, StoryObj } from '@storybook/react';
import { Pill } from '@/components/ds/Pill';

const meta: Meta<typeof Pill> = {
  title: 'DS/Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const SolidAmber: Story = {
  args: {
    variant: 'solid',
    accent: 'amber',
    size: 'md',
    children: 'Solid Amber',
  },
};

export const SolidIndigo: Story = {
  args: {
    variant: 'solid',
    accent: 'indigo',
    size: 'md',
    children: 'Solid Indigo',
  },
};

export const SolidGreen: Story = {
  args: {
    variant: 'solid',
    accent: 'green',
    size: 'md',
    children: 'Solid Green',
  },
};

export const SolidNeutral: Story = {
  args: {
    variant: 'solid',
    accent: 'neutral',
    size: 'md',
    children: 'Solid Neutral',
  },
};

export const OutlineAmber: Story = {
  args: {
    variant: 'outline',
    accent: 'amber',
    size: 'md',
    children: 'Outline Amber',
  },
};

export const OutlineNeutral: Story = {
  args: {
    variant: 'outline',
    accent: 'neutral',
    size: 'md',
    children: 'Outline Neutral',
  },
};

export const Small: Story = {
  args: {
    variant: 'solid',
    accent: 'amber',
    size: 'sm',
    children: 'Small Pill',
  },
};

export const Uppercase: Story = {
  args: {
    variant: 'solid',
    accent: 'amber',
    size: 'md',
    uppercase: true,
    children: 'uppercase pill',
  },
};

export const CustomColor: Story = {
  args: {
    variant: 'solid',
    accent: 'neutral',
    size: 'md',
    color: '#ff6b6b',
    children: 'Custom Color',
  },
};
