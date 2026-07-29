import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from '../../components/common/error-boundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Common/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error for ErrorBoundary');
  }
  return <div className="p-4 bg-primary/10 rounded-lg">No error - content renders normally</div>;
};

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError shouldThrow={false} />
    </ErrorBoundary>
  ),
};

export const WithError: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ErrorBoundary catches errors and displays a fallback UI. Click "Try again" to reset the error state.',
      },
    },
  },
};

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<div className="p-8 bg-destructive/10 border border-destructive rounded-lg">Custom fallback UI</div>}>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ErrorBoundary with a custom fallback component.',
      },
    },
  },
};
