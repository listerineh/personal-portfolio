import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  args: { name: 'Sebastian Alvarez', role: 'Guitar, synths' },
};

export const Live: Story = {
  args: { name: 'Sebastian Alvarez', role: 'Bass', accent: 'amber' },
};
