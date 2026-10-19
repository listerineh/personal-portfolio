import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RoleExplorer } from '@/components/ds/RoleExplorer';
import { Band } from '@/components/ds/Surface';

// Illustrative roles for the story only.
const roles = [
  { company: 'Acme Fintech', jobTitle: 'Senior Software Engineer', employmentDates: 'Dec 2025 - Present', location: 'Remote', current: true, responsibilities: ['Led a migration from a monolith to services.', 'Designed APIs used across teams.'] },
  { company: 'Community Group', jobTitle: 'Organizer', employmentDates: 'Apr 2023 - Present', location: 'Quito, EC', current: true, responsibilities: ['Organized meetups and workshops.'] },
  { company: 'Studio', jobTitle: 'Fullstack Engineer', employmentDates: 'Jan 2021 - Nov 2025', location: 'Remote', responsibilities: ['Built web products end to end.', 'Ran the cloud infrastructure.'] },
];

const meta: Meta<typeof RoleExplorer> = {
  title: 'DS/RoleExplorer',
  component: RoleExplorer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { roles, label: 'Roles', currentLabel: 'Now' },
};

export default meta;
type Story = StoryObj<typeof RoleExplorer>;

/** Click a role or use the arrow keys; on narrow screens the timeline becomes a chip strip. */
export const OnTint: Story = {
  render: (args) => (
    <Band className="py-16">
      <RoleExplorer {...args} />
    </Band>
  ),
};
