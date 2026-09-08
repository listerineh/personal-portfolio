import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ds/Input';

const meta: Meta<typeof Input> = {
  title: 'DS/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Amber: Story = {
  args: {
    accent: 'amber',
    placeholder: 'Amber accent input',
  },
};

export const Indigo: Story = {
  args: {
    accent: 'indigo',
    placeholder: 'Indigo accent input',
  },
};

export const Green: Story = {
  args: {
    accent: 'green',
    placeholder: 'Green accent input',
  },
};

export const Neutral: Story = {
  args: {
    accent: 'neutral',
    placeholder: 'Neutral accent input',
  },
};

export const Error: Story = {
  args: {
    accent: 'amber',
    error: true,
    placeholder: 'Error state input',
  },
};

export const WithValue: Story = {
  args: {
    accent: 'amber',
    defaultValue: 'Pre-filled value',
  },
};

export const Disabled: Story = {
  args: {
    accent: 'amber',
    placeholder: 'Disabled input',
    disabled: true,
  },
};
