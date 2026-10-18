import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section } from '@/components/ds/Section';
import { Button } from '@/components/ds/Button';

const meta: Meta<typeof Section> = {
  title: 'DS/Section',
  component: Section,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    id: 'work',
    title: 'Built and shipped',
    intro: 'A few things I have built, from open-source tools to client work.',
    children: <p className="text-lead text-muted-foreground">Section content goes here.</p>,
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Plain: Story = {};

export const Tint: Story = { args: { tone: 'tint' } };

export const WithAside: Story = {
  args: {
    aside: (
      <Button variant="ghost" accent="amber" href="#">
        View all
      </Button>
    ),
  },
};

/** Plain and tint alternate down the page; no rules between them. */
export const Alternating: Story = {
  render: () => (
    <>
      <Section id="one" title="Built and shipped">
        <p className="text-muted-foreground">Plain ground.</p>
      </Section>
      <Section id="two" tone="tint" title="Notes from the work">
        <p className="text-muted-foreground">Tint ground.</p>
      </Section>
    </>
  ),
};
