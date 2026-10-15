import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '@/components/ds/Title';
import { Wall } from '@/components/ds/Wall';

const meta: Meta<typeof Title> = {
  title: 'DS/Title',
  component: Title,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Title>;

export const WallTitle: Story = {
  args: { as: 'h1', size: 'wall', children: 'Sebastian Alvarez' },
};

export const RoomTitle: Story = {
  args: { size: 'room', children: 'Selected work' },
};

export const SectionTitle: Story = {
  args: { size: 'section', children: 'Backend and distributed systems' },
};

export const WorkTitle: Story = {
  args: { as: 'h3', size: 'work', children: 'OpenStage' },
};

/** On a painted wall the title picks up the wall foreground automatically. */
export const OnWall: Story = {
  render: () => (
    <Wall className="py-16">
      <Title as="h1" size="wall">
        Sebastian
        <br />
        Alvarez
      </Title>
    </Wall>
  ),
};

export const LongText: Story = {
  args: {
    size: 'room',
    children: 'A long room title that wraps across lines and stays balanced at every width',
  },
};
