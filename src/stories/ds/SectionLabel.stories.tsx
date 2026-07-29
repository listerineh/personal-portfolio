import type { Meta, StoryObj } from '@storybook/react';
import { SectionLabel } from '@/components/ds/SectionLabel';

const meta: Meta<typeof SectionLabel> = {
  title: 'DS/SectionLabel',
  component: SectionLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionLabel>;

export const Default: Story = {
  args: {
    children: 'Section Label',
  },
};

export const Amber: Story = {
  args: {
    accent: 'amber',
    children: 'Amber Label',
  },
};

export const Indigo: Story = {
  args: {
    accent: 'indigo',
    children: 'Indigo Label',
  },
};

export const Green: Story = {
  args: {
    accent: 'green',
    children: 'Green Label',
  },
};

export const Neutral: Story = {
  args: {
    accent: 'neutral',
    children: 'Neutral Label',
  },
};
