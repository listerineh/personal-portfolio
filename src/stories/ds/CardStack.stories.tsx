import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CardStack } from '@/components/ds/CardStack';

const Card = ({ label }: { label: string }) => (
  <div className="panel grid aspect-[4/3] place-items-center bg-popover shadow-float">
    <p className="text-headline">{label}</p>
  </div>
);

const meta: Meta<typeof CardStack> = {
  title: 'DS/CardStack',
  component: CardStack,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { interval: 3 },
};

export default meta;
type Story = StoryObj<typeof CardStack>;

/** Move the pointer over the deck to tilt it; it deals the front card every few seconds while not hovered. */
export const Default: Story = {
  render: (args) => (
    <div className="w-[min(480px,90vw)]">
      <CardStack {...args}>
        <Card label="Agent" />
        <Card label="Code" />
        <Card label="Deploy" />
      </CardStack>
    </div>
  ),
};
