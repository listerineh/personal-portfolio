import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AccentCard } from '@/components/ds/AccentCard';
import { Band } from '@/components/ds/Surface';

const meta: Meta<typeof AccentCard> = {
  title: 'DS/AccentCard',
  component: AccentCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AccentCard>;

export const Plain: Story = {
  args: { children: 'A soft rounded panel with ink text.' },
};

/** The amber dot marks something live. */
export const Live: Story = {
  args: { accent: 'amber', children: 'Organizer at GDG Quito since 2022.' },
};

/** On a tint band the panel flips to white (`.tint` re-scopes `--card`), so it still separates from the ground. */
export const OnTint: Story = {
  render: () => (
    <Band className="py-12">
      <AccentCard accent="amber" className="max-w-sm">
        <p className="text-headline">OpenStage</p>
        <p className="text-meta mt-1 text-muted-foreground">2025 · Next.js · Python</p>
      </AccentCard>
    </Band>
  ),
};
