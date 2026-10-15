import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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





export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Error state textarea',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled textarea content',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    rows: 4,
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large textarea with more rows',
    rows: 8,
  },
};
