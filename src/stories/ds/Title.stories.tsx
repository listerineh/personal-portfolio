import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '@/components/ds/Title';

const meta: Meta<typeof Title> = {
  title: 'DS/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    children: 'Default Title',
  },
};

export const AmberGradient: Story = {
  args: {
    gradient: 'amber',
    children: 'Amber Gradient Title',
  },
};

export const IndigoGradient: Story = {
  args: {
    gradient: 'indigo',
    children: 'Indigo Gradient Title',
  },
};

export const GreenGradient: Story = {
  args: {
    gradient: 'green',
    children: 'Green Gradient Title',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a very long title that should wrap appropriately across multiple lines while maintaining readability',
  },
};
