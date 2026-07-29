import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '@/components/ds/FormField';
import { Input } from '@/components/ds/Input';

const meta: Meta<typeof FormField> = {
  title: 'DS/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Username',
    children: <Input placeholder="Enter username" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    children: <Input placeholder="Enter email" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    children: <Input placeholder="Enter password" error />,
  },
};

export const WithTextarea: Story = {
  args: {
    label: 'Message',
    children: <Input placeholder="Enter your message" />,
  },
};

export const Complex: Story = {
  args: {
    label: 'Full Name',
    required: true,
    error: 'This field is required',
    children: <Input placeholder="Enter your full name" error />,
  },
};
