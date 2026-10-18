import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Band, Panel } from '@/components/ds/Surface';

const meta: Meta<typeof Band> = {
  title: 'DS/Surface',
  component: Band,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Band>;

/** The alternate section ground. Panels inside it switch to the page ground so they still lift. */
export const Tint: Story = {
  render: () => (
    <Band className="py-16">
      <h2 className="text-display-sm">Tint band</h2>
      <p className="text-lead mt-4 max-w-[48ch] text-muted-foreground">#F5F5F7 in light, #161617 in dark.</p>
      <Panel className="mt-8 max-w-md">
        <p className="text-headline">A panel on tint</p>
        <p className="mt-2 text-muted-foreground">Notices, form containers, empty states.</p>
      </Panel>
    </Band>
  ),
};

export const Plain: Story = {
  render: () => (
    <Band tone="plain" className="py-16">
      <h2 className="text-display-sm">Plain band</h2>
      <Panel className="mt-8 max-w-md">
        <p className="text-headline">A panel on plain</p>
        <p className="mt-2 text-muted-foreground">Same component, the ground decides its fill.</p>
      </Panel>
    </Band>
  ),
};
