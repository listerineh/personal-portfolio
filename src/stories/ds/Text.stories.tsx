import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@/components/ds/Text';

const meta: Meta<typeof Text> = {
  title: 'DS/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    strength: 'primary',
    children: 'Primary text content with normal weight',
  },
};

export const Secondary: Story = {
  args: {
    strength: 'secondary',
    children: 'Secondary text content for less emphasis',
  },
};

export const Accent: Story = {
  args: {
    strength: 'accent',
    accent: 'amber',
    children: 'Accent text with amber color',
  },
};

export const Muted: Story = {
  args: {
    strength: 'muted',
    children: 'Muted text for subtle information',
  },
};

export const AccentIndigo: Story = {
  args: {
    strength: 'accent',
    accent: 'indigo',
    children: 'Accent text with indigo color',
  },
};

export const AccentGreen: Story = {
  args: {
    strength: 'accent',
    accent: 'green',
    children: 'Accent text with green color',
  },
};

export const LongContent: Story = {
  args: {
    strength: 'primary',
    children: 'This is a longer piece of text content that demonstrates how the Text component handles multiple lines of content while maintaining proper spacing and readability.',
  },
};
