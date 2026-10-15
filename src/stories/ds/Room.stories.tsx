import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Room } from '@/components/ds/Room';
import { RouteRail } from '@/components/ds/RouteRail';
import { ProjectCard } from '@/components/ds/ProjectCard';
import { Button } from '@/components/ds/Button';

const meta: Meta<typeof Room> = {
  title: 'DS/Room',
  component: Room,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Room>;

const work = {
  description: 'Illustrative work used in the story: a collaboration platform for musicians with real-time sessions.',
  imageUrl: '/images/hero-photo.webp',
  tags: ['Next.js', 'Python', 'PostgreSQL'],
};

export const Plaster: Story = {
  args: {
    id: 'work',
    number: '01',
    name: 'Work',
    title: 'Selected work',
    intro: 'Systems I designed and shipped, from the API to the interface.',
    aside: <Button variant="ghost" href="/projects">All projects</Button>,
    children: (
      <div className="grid gap-12 md:grid-cols-2">
        <ProjectCard slug="a" title="OpenStage" number="01" {...work} />
        <ProjectCard slug="b" title="Second work" number="02" {...work} />
      </div>
    ),
  },
};

export const Painted: Story = {
  args: { ...Plaster.args, tone: 'paint', id: 'work-paint' },
};

/** Two rooms and the route line along the floor; scroll the canvas to walk it. */
export const WithRoute: Story = {
  render: () => (
    <>
      <Room id="r1" number="01" name="Work" title="Selected work" tone="paint">
        <div className="h-[80vh]" />
      </Room>
      <Room id="r2" number="02" name="Writing" title="Written work">
        <div className="h-[80vh]" />
      </Room>
      <RouteRail />
    </>
  ),
};
