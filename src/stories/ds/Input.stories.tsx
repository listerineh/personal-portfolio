import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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





export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Error state input',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled value',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
