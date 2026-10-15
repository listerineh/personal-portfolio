import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ds/Button';
import { Wall } from '@/components/ds/Wall';

const meta: Meta<typeof Button> = {
  title: 'DS/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    accent: 'neutral',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    accent: 'neutral',
    size: 'md',
    children: 'Ghost Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'sm',
    children: 'Small Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    accent: 'amber',
    size: 'md',
    children: 'Button with Icon',
  },
};

/** On a painted wall, ink buttons pick up the wall foreground; amber stays the one live action. */
export const OnWall: Story = {
  render: () => (
    <Wall className="flex flex-wrap gap-3 py-10">
      <Button accent="amber">Walk the work</Button>
      <Button variant="secondary">Contact</Button>
      <Button variant="ghost">Download CV</Button>
    </Wall>
  ),
};
