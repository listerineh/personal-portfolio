import type { Meta, StoryObj } from '@storybook/react';
import { AccentCard } from '@/components/ds/AccentCard';

const meta: Meta<typeof AccentCard> = {
  title: 'DS/AccentCard',
  component: AccentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AccentCard>;

export const Default: Story = {
  args: {
    accent: 'amber',
    children: 'Default accent card content',
  },
};

export const Amber: Story = {
  args: {
    accent: 'amber',
    children: 'Amber accent card with warm tones',
  },
};

export const Indigo: Story = {
  args: {
    accent: 'indigo',
    children: 'Indigo accent card with cool tones',
  },
};

export const Green: Story = {
  args: {
    accent: 'green',
    children: 'Green accent card with natural tones',
  },
};

export const Neutral: Story = {
  args: {
    accent: 'neutral',
    children: 'Neutral accent card with subtle tones',
  },
};

export const WithComplexContent: Story = {
  args: {
    accent: 'amber',
    children: (
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Card Title</h3>
        <p className="text-sm opacity-80">This is a more complex card with multiple elements inside.</p>
      </div>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    accent: 'indigo',
    className: 'p-8',
    children: 'Card with custom padding',
  },
};
