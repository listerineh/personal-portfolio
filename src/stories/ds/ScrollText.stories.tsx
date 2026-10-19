import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ScrollText } from '@/components/ds/ScrollText';
import { CountUp } from '@/components/ds/CountUp';

const meta: Meta<typeof ScrollText> = {
  title: 'DS/ScrollText',
  component: ScrollText,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    text: 'Software engineer from Quito, Ecuador. I build backend systems, lead engineering teams, and lately spend a lot of time on applied AI.',
  },
};

export default meta;
type Story = StoryObj<typeof ScrollText>;

/** Scroll the canvas: words light up one after another. Motion needs html.js-motion. */
export const OnScroll: Story = {
  render: (args) => (
    <div className="py-[90vh]">
      <ScrollText {...args} className="max-w-[26ch] text-[clamp(1.75rem,4.4vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.035em]" />
    </div>
  ),
};

/** Figures that count up when they enter the viewport; the final value is always in the markup. */
export const Figures: Story = {
  render: () => (
    <div className="flex gap-10 text-[3rem] font-bold tracking-[-0.05em]">
      <CountUp value="6+" />
      <CountUp value="4.6K+" />
      <CountUp value="10+" />
    </div>
  ),
};
