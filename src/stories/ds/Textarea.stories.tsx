import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@/components/ds/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'DS/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const Amber: Story = {
  args: {
    accent: 'amber',
    placeholder: 'Amber accent textarea',
    rows: 4,
  },
};

export const Indigo: Story = {
  args: {
    accent: 'indigo',
    placeholder: 'Indigo accent textarea',
    rows: 4,
  },
};

export const Green: Story = {
  args: {
    accent: 'green',
    placeholder: 'Green accent textarea',
    rows: 4,
  },
};

export const Neutral: Story = {
  args: {
    accent: 'neutral',
    placeholder: 'Neutral accent textarea',
    rows: 4,
  },
};

export const Error: Story = {
  args: {
    accent: 'amber',
    error: true,
    placeholder: 'Error state textarea',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    accent: 'amber',
    defaultValue: 'Pre-filled textarea content',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    accent: 'amber',
    placeholder: 'Disabled textarea',
    rows: 4,
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    accent: 'amber',
    placeholder: 'Large textarea with more rows',
    rows: 8,
  },
};
