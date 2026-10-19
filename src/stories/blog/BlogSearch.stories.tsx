import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { BlogSearch } from '@/components/blog/blog-search';
import { getBlogPosts } from '@/lib/data/blog';
import { toBlogListing } from '@/lib/data/blog/summaries';
import type { BlogListingPost } from '@/types';

const posts = getBlogPosts('en').map(toBlogListing);

function SearchWithResults() {
  const [results, setResults] = useState<BlogListingPost[]>(posts);
  return (
    <div className="grid max-w-3xl gap-8">
      <BlogSearch posts={posts} onFilteredPostsChange={setResults} />
      <ol className="divide-y divide-foreground/20 border-y border-foreground/20">
        {results.map((post) => (
          <li key={post.slug} className="py-3 text-sm">
            {post.title}
          </li>
        ))}
      </ol>
    </div>
  );
}

const meta: Meta<typeof BlogSearch> = {
  title: 'Blog/BlogSearch',
  component: BlogSearch,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlogSearch>;

/** Search, tag filter and sort toggles; the list below shows what the filters return. */
export const Default: Story = { render: () => <SearchWithResults /> };

export const OnWall: Story = {
  render: () => (
    <div className="tint p-8">
      <SearchWithResults />
    </div>
  ),
};
