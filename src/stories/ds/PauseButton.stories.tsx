import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PauseButton } from '@/components/ds/PauseButton';

const meta: Meta<typeof PauseButton> = {
  title: 'DS/PauseButton',
  component: PauseButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Pause the animations', paused: false },
};

export default meta;
type Story = StoryObj<typeof PauseButton>;

/** A toggle: pause while things move, play once stopped. Hidden when reduced motion is on (nothing moves then). */
export const Toggle: Story = {
  render: function Render(args) {
    const [paused, setPaused] = useState(args.paused);
    return <PauseButton {...args} paused={paused} onPausedChange={setPaused} />;
  },
};

export const Paused: Story = { args: { paused: true } };
