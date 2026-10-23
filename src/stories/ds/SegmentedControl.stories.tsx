import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SegmentedControl } from '@/components/ds/SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'DS/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Editing language',
    value: 'es',
    onChange: () => {},
    options: [
      { value: 'es', label: 'ES', ariaLabel: 'Español' },
      { value: 'en', label: 'EN', ariaLabel: 'English' },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {};

export const ThreeOptions: Story = {
  args: {
    label: 'View',
    value: 'week',
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
  },
};
