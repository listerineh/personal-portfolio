import type { Meta, StoryObj } from '@storybook/react';
import { AccentCard } from '@/components/ds/AccentCard';
import { Wall } from '@/components/ds/Wall';

const meta: Meta<typeof AccentCard> = {
  title: 'DS/AccentCard (Plaque)',
  component: AccentCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AccentCard>;

export const Plain: Story = {
  args: { children: 'A paper plaque: flat, square, ink text.' },
};

/** The amber corner marks something live. */
export const Live: Story = {
  args: { accent: 'amber', children: 'Organizer at GDG Quito since 2022.' },
};

/** A plaque restores ground tokens, so it reads the same on a painted wall. */
export const OnWall: Story = {
  render: () => (
    <Wall className="py-12">
      <AccentCard accent="amber" className="max-w-sm">
        <p className="text-headline">OpenStage</p>
        <p className="text-catalog mt-1 text-muted-foreground">2025 · Next.js · Python</p>
      </AccentCard>
    </Wall>
  ),
};
