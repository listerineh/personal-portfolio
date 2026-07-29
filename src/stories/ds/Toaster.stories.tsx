import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ds/Button';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ds/Toaster';

function ToasterDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button
        onClick={() => toast({
          title: 'Success',
          description: 'Your changes have been saved successfully.',
        })}
      >
        Show Success Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({
          title: 'Info',
          description: 'This is an informational message.',
        })}
      >
        Show Info Toast
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        })}
      >
        Show Error Toast
      </Button>
      <Toaster />
    </div>
  );
}

const meta: Meta<typeof ToasterDemo> = {
  title: 'DS/Toaster',
  component: ToasterDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToasterDemo>;

export const Default: Story = {
  render: () => <ToasterDemo />,
};
