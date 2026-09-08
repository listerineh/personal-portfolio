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
