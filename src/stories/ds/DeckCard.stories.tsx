import Image from 'next/image';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DeckCard } from '@/components/ds/DeckCard';

const meta: Meta<typeof DeckCard> = {
  title: 'DS/DeckCard',
  component: DeckCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    href: '#',
    title: 'Agents that ship: from prototype to production',
    description: 'What changes when an AI agent has to run every day, for real users, on a budget.',
    meta: 'Build with AI LATAM · May 2026',
    viewLabel: 'View slides',
    preview: <Image src="/images/website_screenshot.webp" alt="" fill sizes="400px" className="object-cover" />,
  },
  render: (args) => (
    <div className="w-[380px]">
      <DeckCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DeckCard>;

export const Default: Story = {};

export const WithoutDescription: Story = { args: { description: undefined } };
