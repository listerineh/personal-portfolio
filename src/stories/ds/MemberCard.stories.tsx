import type { Meta, StoryObj } from '@storybook/react';
import { MemberCard } from '@/components/ds/MemberCard';

const meta: Meta<typeof MemberCard> = {
  title: 'DS/MemberCard',
  component: MemberCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MemberCard>;

export const Default: Story = {
  args: { name: 'Sebastián Álvarez', role: 'Guitar, synths' },
};

export const Live: Story = {
  args: { name: 'Sebastián Álvarez', role: 'Bass', accent: 'amber' },
};
