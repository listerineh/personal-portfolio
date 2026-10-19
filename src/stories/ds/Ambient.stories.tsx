import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Ambient } from '@/components/ds/Ambient';

const meta: Meta<typeof Ambient> = {
  title: 'DS/Ambient',
  component: Ambient,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Ambient>;

/** Move the mouse over the area: the dots under the pointer light up. Halos drift only with motion enabled. */
export const Hero: Story = {
  render: (args) => (
    <section className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden bg-background px-gutter">
      <Ambient {...args} />
      <h2 className="text-display text-center">Ambient light</h2>
    </section>
  ),
};

export const SoftCard: Story = {
  args: { intensity: 'soft', spotlight: false },
  render: (args) => (
    <div className="p-10">
      <div className="tint relative isolate overflow-hidden rounded-xl px-8 py-20 text-center">
        <Ambient {...args} />
        <h2 className="text-display-sm">Work with me</h2>
      </div>
    </div>
  ),
};
