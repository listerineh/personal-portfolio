import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { BlogPostContent } from '@/components/blog/blog-post-content';

const article = `## Introduction\n\nText.\n\n## Architecture\n\nText.\n\n### API layer\n\nText.\n\n### Data layer\n\nText.\n\n## Lessons\n\nText.`;

const meta: Meta<typeof TableOfContents> = {
  title: 'Blog/TableOfContents',
  component: TableOfContents,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

/** Reads h2/h3 from the rendered article (ids come from the server-side markdown render). */
export const Default: Story = {
  render: () => (
    <div className="grid gap-10 md:grid-cols-[16rem_1fr]">
      <TableOfContents contentKey="story" />
      <BlogPostContent content={article} />
    </div>
  ),
};
