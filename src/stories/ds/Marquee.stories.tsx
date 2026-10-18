import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Marquee } from '@/components/ds/Marquee';
import { SkillTile } from '@/components/ds/SkillTile';
import { Band } from '@/components/ds/Surface';

const icon = (slug: string) => `https://raw.githubusercontent.com/devicons/devicon/master/icons/${slug}/${slug}-original.svg`;
const skills = [
  ['React', 'react'], ['TypeScript', 'typescript'], ['Python', 'python'], ['Go', 'go'],
  ['PostgreSQL', 'postgresql'], ['Docker', 'docker'], ['Redis', 'redis'], ['Flutter', 'flutter'],
].map(([name, slug]) => ({ name, iconUrl: icon(slug) }));

const meta: Meta<typeof Marquee> = {
  title: 'DS/Marquee',
  component: Marquee,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { duration: 24, label: 'Skills' },
};

export default meta;
type Story = StoryObj<typeof Marquee>;

/** Two rows in opposite directions; hover pauses a row. Motion needs html.js-motion (set by the app's pre-paint script). */
export const SkillRows: Story = {
  render: (args) => (
    <Band className="grid gap-2 px-0 py-16">
      <Marquee {...args}>{skills.map((s) => <SkillTile key={s.name} {...s} />)}</Marquee>
      <Marquee {...args} reverse>{[...skills].reverse().map((s) => <SkillTile key={s.name} {...s} />)}</Marquee>
    </Band>
  ),
};

/** A filter fades out what it excludes and freezes the row. */
export const Filtered: Story = {
  render: (args) => (
    <Band className="px-0 py-16">
      <Marquee {...args} paused>
        {skills.map((s, i) => <SkillTile key={s.name} {...s} dimmed={i % 3 !== 0} />)}
      </Marquee>
    </Band>
  ),
};
