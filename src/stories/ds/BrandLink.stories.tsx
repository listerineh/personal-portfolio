import type { Meta, StoryObj } from '@storybook/react';
import { BrandLink } from '@/components/ds/BrandLink';

const meta: Meta<typeof BrandLink> = {
  title: 'DS/BrandLink',
  component: BrandLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BrandLink>;

export const Default: Story = {
  args: {
    href: 'https://example.com',
    color: '#f59e0b',
    children: 'Brand Link',
  },
};

export const Solid: Story = {
  args: {
    href: 'https://example.com',
    color: '#f59e0b',
    variant: 'solid',
    children: 'Solid Brand Link',
  },
};

export const Outline: Story = {
  args: {
    href: 'https://example.com',
    color: '#f59e0b',
    variant: 'outline',
    children: 'Outline Brand Link',
  },
};

export const Amber: Story = {
  args: {
    href: 'https://example.com',
    color: '#f59e0b',
    children: 'Amber Brand',
  },
};

export const Indigo: Story = {
  args: {
    href: 'https://example.com',
    color: '#6366f1',
    children: 'Indigo Brand',
  },
};

export const Green: Story = {
  args: {
    href: 'https://example.com',
    color: '#10b981',
    children: 'Green Brand',
  },
};

export const CustomColor: Story = {
  args: {
    href: 'https://example.com',
    color: '#ff6b6b',
    children: 'Custom Color Brand',
  },
};
