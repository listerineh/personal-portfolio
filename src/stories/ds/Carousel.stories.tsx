import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Carousel } from '@/components/ds/Carousel';
import { ProjectCard } from '@/components/ds/ProjectCard';
import { Band } from '@/components/ds/Surface';

const projects = ['VibeArchitect', 'OpenStage', 'OpenKanban Board', 'Cadenza App', 'GDG Ecuador'].map((title, index) => ({
  slug: title.toLowerCase().replace(/\s+/g, '-'),
  title,
  description: 'Illustrative description for the story: one or two lines about what the project does.',
  imageUrl: '/images/website_screenshot.webp',
  tags: ['Next.js', 'TypeScript', 'Supabase'],
  live: index === 0,
}));

const meta: Meta<typeof Carousel> = {
  title: 'DS/Carousel',
  component: Carousel,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { label: 'Projects', previousLabel: 'Previous', nextLabel: 'Next' },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

/** Flick or use the arrows; the first card lines up with the page column, the rest run off the edge. */
export const Projects: Story = {
  render: (args) => (
    <Band className="px-0 py-16">
      <Carousel {...args}>
        {projects.map(({ live, ...project }) => (
          <ProjectCard key={project.slug} {...project} status={live ? 'in-progress' : 'completed'} statusLabel={live ? 'In progress' : 'Completed'} />
        ))}
      </Carousel>
    </Band>
  ),
};
