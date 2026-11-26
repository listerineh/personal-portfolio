import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FlowDiagram } from '@/components/ds/FlowDiagram';
import { Band } from '@/components/ds/Surface';

const meta: Meta<typeof FlowDiagram> = {
  title: 'DS/FlowDiagram',
  component: FlowDiagram,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    kindLabels: { agent: 'AI agent', queue: 'Queue', service: 'Service', actor: 'Person', output: 'Result', store: 'Data', client: 'App' },
    steps: [
      { label: 'Pull request', detail: 'Signed GitHub webhook', kind: 'actor' },
      { label: 'API', detail: 'Cloud Run answers 202', kind: 'service' },
      { label: 'Triage', detail: 'Gemini writes a hypothesis and a test', kind: 'agent' },
      { label: 'Sandbox', detail: 'Cloud Run Job, no network', kind: 'service' },
      { label: 'Judge', detail: 'Reads exit codes, not opinions', kind: 'agent' },
      { label: 'Comment', detail: 'Fix and typed report on the PR', kind: 'output' },
    ],
    loop: 'A red run goes back to Triage with feedback, up to 3 times, then to a human.',
  },
};

export default meta;
type Story = StoryObj<typeof FlowDiagram>;

export const OnTint: Story = {
  render: (args) => (
    <Band className="py-12">
      <FlowDiagram {...args} />
    </Band>
  ),
};

export const Short: Story = {
  args: {
    steps: [
      { label: 'Browser', detail: 'Next.js PWA', kind: 'client' },
      { label: 'Firestore', detail: 'Realtime listeners', kind: 'store' },
      { label: 'Teammates', detail: 'Same board, live', kind: 'actor' },
    ],
    loop: undefined,
  },
};
