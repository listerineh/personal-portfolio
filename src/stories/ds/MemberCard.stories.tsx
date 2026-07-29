import type { Meta, StoryObj } from '@storybook/react';
import { MemberCard } from '@/components/ds/MemberCard';

const meta: Meta<typeof MemberCard> = {
  title: 'DS/MemberCard',
  component: MemberCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MemberCard>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    role: 'Software Engineer',
  },
};

export const Amber: Story = {
  args: {
    name: 'Jane Smith',
    role: 'Product Designer',
    accent: 'amber',
  },
};

export const Indigo: Story = {
  args: {
    name: 'Alex Johnson',
    role: 'Tech Lead',
    accent: 'indigo',
  },
};

export const Green: Story = {
  args: {
    name: 'Sam Wilson',
    role: 'DevOps Engineer',
    accent: 'green',
  },
};

export const Neutral: Story = {
  args: {
    name: 'Taylor Brown',
    role: 'Full Stack Developer',
    accent: 'neutral',
  },
};

export const LongName: Story = {
  args: {
    name: 'Christopher Alexander Montgomery III',
    role: 'Senior Principal Software Architect',
    accent: 'amber',
  },
};

export const ShortName: Story = {
  args: {
    name: 'Li',
    role: 'Developer',
    accent: 'indigo',
  },
};
