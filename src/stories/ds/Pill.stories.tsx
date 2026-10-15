import type { Meta, StoryObj } from '@storybook/react';
import { Pill } from '@/components/ds/Pill';

const meta: Meta<typeof Pill> = {
  title: 'DS/Pill',
  component: Pill,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Catalog: Story = {
  args: { variant: 'solid', children: 'Next.js' },
};

export const Ruled: Story = {
  args: { variant: 'outline', children: 'Terraform' },
};

/** Amber = live: current role, new post, available. */
export const Live: Story = {
  args: { variant: 'solid', accent: 'amber', children: 'In progress' },
};

export const Small: Story = {
  args: { variant: 'outline', size: 'sm', children: 'Python' },
};

export const BrandColor: Story = {
  args: { variant: 'outline', color: '#1DB954', children: 'Listerineh' },
};

export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['Next.js', 'Python', 'PostgreSQL', 'Terraform', 'MCP'].map((tag) => (
        <Pill key={tag} variant="outline">
          {tag}
        </Pill>
      ))}
    </div>
  ),
};
