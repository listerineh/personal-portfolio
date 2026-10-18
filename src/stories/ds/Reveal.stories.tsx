import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Reveal } from '@/components/ds/Reveal';
import { Panel } from '@/components/ds/Surface';

const meta: Meta<typeof Reveal> = {
  title: 'DS/Reveal',
  component: Reveal,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Reveal>;

/** Scroll the canvas: each panel rises into place as it enters. Motion needs html.js-motion (set by the app's pre-paint script). */
export const OnScroll: Story = {
  render: () => (
    <div className="grid gap-6 pb-[60vh] pt-[80vh]">
      {[1, 2, 3, 4].map((n) => (
        <Reveal key={n}>
          <Panel>
            <p className="text-headline">Panel {n}</p>
          </Panel>
        </Reveal>
      ))}
    </div>
  ),
};
