import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { KeyFigures } from '@/components/ds/KeyFigures';
import { Band } from '@/components/ds/Surface';

const meta: Meta<typeof KeyFigures> = {
  title: 'DS/KeyFigures',
  component: KeyFigures,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    figures: [
      { value: '3', label: 'Agents, each behind its own queue' },
      { value: '111 s', label: 'From a new pull request to a proposed fix' },
      { value: '0.13 USD', label: 'For 22 reviewed pull requests' },
      { value: '15', label: 'Spans in one trace, webhook to verdict' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof KeyFigures>;

export const Default: Story = {};

export const ThreeOnTint: Story = {
  render: (args) => (
    <Band className="py-12">
      <KeyFigures figures={args.figures.slice(0, 3)} />
    </Band>
  ),
};
