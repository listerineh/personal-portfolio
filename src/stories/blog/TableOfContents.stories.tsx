import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NextIntlClientProvider } from 'next-intl';

// Mock TableOfContents for Storybook
function MockTableOfContents({ headings }: { headings?: Array<{ id: string; text: string; level: number }> }) {
  const t = {
    tableOfContents: 'Table of Contents',
  };

  const mockHeadings = headings || [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'getting-started', text: 'Getting Started', level: 2 },
    { id: 'installation', text: 'Installation', level: 3 },
    { id: 'configuration', text: 'Configuration', level: 3 },
    { id: 'advanced-usage', text: 'Advanced Usage', level: 2 },
    { id: 'performance', text: 'Performance', level: 3 },
    { id: 'conclusion', text: 'Conclusion', level: 2 },
  ];

  const handleHeadingClick = (id: string) => {
    console.log('Navigate to:', id);
  };

  return (
    <nav className="space-y-3">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <List className="h-3.5 w-3.5 text-foreground/35" />
          <p className="font-headline text-[10px] tracking-[0.3em] uppercase text-foreground/35">{t.tableOfContents}</p>
        </div>
        
        <ul className="space-y-1 text-sm border-l-2 border-foreground/[0.07]">
          {mockHeadings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                'transition-all duration-200',
                heading.level === 3 && 'ml-4'
              )}
            >
              <button
                onClick={() => handleHeadingClick(heading.id)}
                className={cn(
                  'block w-full text-left py-1 px-4 -ml-[2px] border-l-2 transition-all duration-200',
                  'text-foreground/40 border-transparent hover:text-primary hover:border-primary cursor-pointer'
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const messages = {
  blog: {
    tableOfContents: 'Table of Contents',
  },
};

const meta: Meta<typeof MockTableOfContents> = {
  title: 'Blog/TableOfContents',
  component: MockTableOfContents,
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
type Story = StoryObj<typeof MockTableOfContents>;

export const Default: Story = {
  render: () => <MockTableOfContents />,
  parameters: {
    docs: {
      description: {
        story: 'TableOfContents component extracts headings from blog content. This mock version demonstrates the UI with static headings.',
      },
    },
  },
};

export const Simple: Story = {
  render: () => {
    const simpleHeadings = [
      { id: 'intro', text: 'Introduction', level: 2 },
      { id: 'conclusion', text: 'Conclusion', level: 2 },
    ];
    return <MockTableOfContents headings={simpleHeadings} />;
  },
};

export const Nested: Story = {
  render: () => {
    const nestedHeadings = [
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'setup', text: 'Setup', level: 3 },
      { id: 'config', text: 'Configuration', level: 3 },
      { id: 'examples', text: 'Examples', level: 2 },
      { id: 'basic', text: 'Basic Usage', level: 3 },
      { id: 'advanced', text: 'Advanced Patterns', level: 3 },
      { id: 'summary', text: 'Summary', level: 2 },
    ];
    return <MockTableOfContents headings={nestedHeadings} />;
  },
};
