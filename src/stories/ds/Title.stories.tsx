import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Title } from '@/components/ds/Title';
import { Band } from '@/components/ds/Surface';

const meta: Meta<typeof Title> = {
  title: 'DS/Title',
  component: Title,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Title>;

export const WallTitle: Story = {
  args: { as: 'h1', size: 'display', children: 'Sebastian Alvarez' },
};

export const RoomTitle: Story = {
  args: { size: 'title', children: 'Selected work' },
};

export const SectionTitle: Story = {
  args: { size: 'section', children: 'Backend and distributed systems' },
};

export const WorkTitle: Story = {
  args: { as: 'h3', size: 'work', children: 'OpenStage' },
};

/** On a tint band the title keeps the ink token; no per-surface color needed. */
export const OnTint: Story = {
  render: () => (
    <Band className="py-16">
      <Title as="h1" size="display">
        Sebastian
        <br />
        Alvarez
      </Title>
    </Band>
  ),
};

export const LongText: Story = {
  args: {
    size: 'title',
    children: 'A long room title that wraps across lines and stays balanced at every width',
  },
};
