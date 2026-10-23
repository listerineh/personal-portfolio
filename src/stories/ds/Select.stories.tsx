import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from '@/components/ds/Select';

const options = [
  { value: 'draft', label: 'Draft' },
  { value: 'unlisted', label: 'Unlisted' },
  { value: 'published', label: 'Published' },
];

const meta: Meta<typeof Select> = {
  title: 'DS/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { options, value: 'draft', onValueChange: () => {}, 'aria-label': 'Visibility' },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-64">
        <Select {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Placeholder: Story = { args: { value: '', placeholder: 'Choose a layout…' } };

export const Invalid: Story = { args: { 'aria-invalid': true } };

export const Disabled: Story = { args: { disabled: true } };
