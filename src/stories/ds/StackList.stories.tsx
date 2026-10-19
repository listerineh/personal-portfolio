import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StackList } from '@/components/ds/StackList';
import { Band } from '@/components/ds/Surface';

const meta: Meta<typeof StackList> = {
  title: 'DS/StackList',
  component: StackList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    caption: 'Stack',
    layers: [
      { name: 'Interface', items: ['Next.js', 'Tailwind'] },
      { name: 'AI', items: ['MCP', 'Claude'] },
      { name: 'API & backend', items: ['FastAPI', 'Python'] },
      { name: 'Data', items: ['PostgreSQL', 'Redis'] },
      { name: 'Cloud & infra', items: ['AWS', 'Terraform'] },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof StackList>;

export const Default: Story = {
  render: (args) => <StackList {...args} className="max-w-sm" />,
};

export const OnTint: Story = {
  render: (args) => (
    <Band className="py-12">
      <StackList {...args} className="max-w-sm" />
    </Band>
  ),
};
