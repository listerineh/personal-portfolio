import type { Meta, StoryObj } from '@storybook/react';
import { Eye } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';

// Mock BlogViews for Storybook
function MockBlogViews({ views = 1234, isLoading = false }: { views?: number; isLoading?: boolean }) {
  const t = {
    loading: 'Loading...',
    view: 'view',
    views: 'views',
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Eye className="h-4 w-4 animate-pulse" />
        <span className="animate-pulse">{t.loading}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>
        <strong className="text-foreground">{views.toLocaleString()}</strong> {views !== 1 ? t.views : t.view}
      </span>
    </div>
  );
}

const messages = {
  blog: {
    loading: 'Loading...',
    view: 'view',
    views: 'views',
  },
};

const meta: Meta<typeof MockBlogViews> = {
  title: 'Blog/BlogViews',
  component: MockBlogViews,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NextIntlClientProvider messages={messages} locale="en">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MockBlogViews>;

export const Default: Story = {
  render: () => <MockBlogViews />,
  parameters: {
    docs: {
      description: {
        story: 'BlogViews component fetches and displays view count from API. This mock version displays a static count.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => <MockBlogViews isLoading />,
};

export const HighViews: Story = {
  render: () => <MockBlogViews views={98765} />,
};

export const SingleView: Story = {
  render: () => <MockBlogViews views={1} />,
};
