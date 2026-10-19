import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from '@/components/ds/Text';
import { Band } from '@/components/ds/Surface';

const meta: Meta<typeof Text> = {
  title: 'DS/Text',
  component: Text,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: { strength: 'primary', children: 'I build backend systems, cloud infrastructure and the interfaces on top of them.' },
};

export const Secondary: Story = {
  args: { strength: 'secondary', children: 'Secondary text for supporting information.' },
};

/** Accent is the live amber, tuned per surface to stay AA. Use it only for what is live now. */
export const Accent: Story = {
  args: { strength: 'accent', children: 'Available for new projects' },
};

export const Lead: Story = {
  args: { size: 'lg', strength: 'secondary', children: 'A lead paragraph sits under a section title and keeps its measure under 60 characters.' },
};

export const OnTint: Story = {
  render: () => (
    <Band className="space-y-3 py-10">
      <Text>Primary text on a tint band.</Text>
      <Text strength="secondary">Secondary text on a tint band.</Text>
      <Text strength="accent">Amber text on a tint band (primary-ink, AA).</Text>
    </Band>
  ),
};
