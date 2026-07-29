import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/components/ds/Switch';

const meta: Meta<typeof Switch> = {
  title: 'DS/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Amber: Story = {
  args: {
    checked: true,
    accentColor: '#f59e0b',
  },
};

export const Indigo: Story = {
  args: {
    checked: true,
    accentColor: '#818cf8',
  },
};

export const Green: Story = {
  args: {
    checked: true,
    accentColor: '#1DB954',
  },
};

export const CustomColor: Story = {
  args: {
    checked: true,
    accentColor: '#ff6b6b',
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const WithHandler: Story = {
  args: {
    checked: false,
    onCheckedChange: (checked) => console.log('Switch changed:', checked),
  },
};
