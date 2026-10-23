import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconPicker } from '@/components/ds/IconPicker';

const meta: Meta<typeof IconPicker> = {
  title: 'DS/IconPicker',
  component: IconPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { labels: { search: 'Search icons', empty: 'No icon with that name', choose: 'Choose an icon' }, onChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-64">
        <IconPicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof IconPicker>;

export const Empty: Story = {};

export const WithIcon: Story = { args: { value: 'rocket' } };

export const Invalid: Story = { args: { value: 'not-an-icon', 'aria-invalid': true } };
