import type { Meta, StoryObj } from '@storybook/react';
import { Wall, Plaque } from '@/components/ds/Wall';
import { Button } from '@/components/ds/Button';

const meta: Meta<typeof Wall> = {
  title: 'DS/Wall',
  component: Wall,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Wall>;

/** Painted gallery green. Text, muted and amber tokens re-scope to stay AA on it. */
export const Painted: Story = {
  render: () => (
    <Wall className="py-16">
      <h1 className="text-display">
        Sebastian
        <br />
        Alvarez
      </h1>
      <p className="text-lead mt-6 max-w-[40ch] text-muted-foreground">Full-stack engineer. Systems, cloud and applied AI, from the API to the interface.</p>
      <p className="mt-4 text-primary">Available for new projects</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button accent="amber">Walk the work</Button>
        <Button variant="secondary">Contact</Button>
      </div>
    </Wall>
  ),
};

export const Plaster: Story = {
  render: () => (
    <Wall tone="plaster" className="py-16">
      <h2 className="text-display-sm">Written work</h2>
      <p className="text-lead mt-4 max-w-[48ch] text-muted-foreground">Bare ground: plaster in light, after-hours in dark.</p>
    </Wall>
  ),
};

export const PlaqueOnWall: Story = {
  render: () => (
    <Wall className="py-16">
      <Plaque className="max-w-xs">
        <p className="text-headline">OpenStage</p>
        <p className="text-catalog mt-2 text-muted-foreground">2025 · Next.js · Python · MCP</p>
        <p className="mt-3 text-sm text-primary">In progress</p>
      </Plaque>
    </Wall>
  ),
};
