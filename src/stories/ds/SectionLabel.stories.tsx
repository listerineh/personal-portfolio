import type { Meta, StoryObj } from '@storybook/react';
import { SectionLabel } from '@/components/ds/SectionLabel';

const meta: Meta<typeof SectionLabel> = {
  title: 'DS/SectionLabel (Catalog line)',
  component: SectionLabel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionLabel>;

/** Data printed on a label. Never an eyebrow above a heading. */
export const Default: Story = {
  args: { children: '2025 · Next.js · Python · MCP' },
};

export const Live: Story = {
  args: { accent: 'amber', children: 'Now · Senior Software Engineer' },
};
