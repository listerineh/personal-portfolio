import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DecisionList } from '@/components/ds/DecisionList';

const meta: Meta<typeof DecisionList> = {
  title: 'DS/DecisionList',
  component: DecisionList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    labels: { why: 'Why', tradeoff: 'What it cost' },
    decisions: [
      {
        title: 'Put every agent behind a queue',
        why: 'A slow or failing model call retries with backoff instead of holding a request open.',
        tradeoff: 'Pub/Sub starts a new trace per message, so the trace context travels by hand.',
      },
      {
        title: 'Let exit codes decide, not the model',
        why: 'The test must fail before the fix and pass after it. The judge can reject green, never approve red.',
        tradeoff: 'A test that only covers its own case can still pass a wrong fix. Humans merge.',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DecisionList>;

export const Default: Story = {};
