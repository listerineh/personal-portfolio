import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUp } from 'lucide-react';

// Mock BackToTopButton for Storybook that forces visibility
function MockBackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-40 h-11 w-11 rounded-full shadow-xl flex items-center justify-center font-bold border-0"
      style={{ background: 'rgb(var(--primary))', color: 'rgb(var(--primary-foreground))' }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

const meta: Meta<typeof MockBackToTopButton> = {
  title: 'Common/BackToTopButton',
  component: MockBackToTopButton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockBackToTopButton>;

export const Default: Story = {
  render: () => (
    <>
      <p className="text-center p-8">Mock BackToTopButton is always visible in Storybook</p>
      <MockBackToTopButton />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The BackToTopButton appears when scrolling down. This mock version forces visibility for Storybook demonstration. The real component only shows after scrolling 800px.',
      },
    },
  },
};



