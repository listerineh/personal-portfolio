import type { Meta, StoryObj } from '@storybook/react';
import { WorkingDrawing } from '@/components/ds/WorkingDrawing';
import { Wall } from '@/components/ds/Wall';

const meta: Meta<typeof WorkingDrawing> = {
  title: 'DS/WorkingDrawing',
  component: WorkingDrawing,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    caption: 'Elevation · stack',
    layers: [
      { name: 'Interface', items: ['Next.js', 'Tailwind'] },
      { name: 'Agents', items: ['MCP', 'Claude'] },
      { name: 'API', items: ['FastAPI', 'Python'] },
      { name: 'Data', items: ['PostgreSQL', 'Redis'] },
      { name: 'Infra', items: ['AWS', 'Terraform'] },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof WorkingDrawing>;

export const Default: Story = {
  render: (args) => <WorkingDrawing {...args} className="max-w-xs" />,
};

export const OnWall: Story = {
  render: (args) => (
    <Wall className="py-12">
      <WorkingDrawing {...args} className="max-w-xs" />
    </Wall>
  ),
};
