import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggleButton } from '../../components/common/theme-toggle-button';

const meta: Meta<typeof ThemeToggleButton> = {
  title: 'Common/ThemeToggleButton',
  component: ThemeToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToggleButton>;

export const Default: Story = {
  render: () => <ThemeToggleButton />,
};

export const WithCustomClass: Story = {
  render: () => <ThemeToggleButton className="text-foreground/55 hover:text-foreground" />,
};
