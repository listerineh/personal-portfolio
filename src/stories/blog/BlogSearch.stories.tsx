import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Search, X, Filter, TrendingUp, ArrowUpAZ, ArrowDownAZ, Sparkles } from 'lucide-react';
import { Input, Pill, Dropdown, DropdownTrigger, DropdownContent, DropdownCheckboxItem, DropdownLabel, DropdownSeparator } from '../../components/ds';
import { NextIntlClientProvider } from 'next-intl';

// Mock BlogSearch for Storybook
function MockBlogSearch() {
  const t = {
    searchPlaceholder: 'Search articles...',
    tags: 'Tags',
    filterByTags: 'Filter by tags',
    clearAll: 'Clear all',
    sortBy: 'Sort by',
    sortAll: 'All',
    sortRecommended: 'Recommended',
    sortMostViewed: 'Most Viewed',
    sortDescending: 'Newest',
    sortAscending: 'Oldest',
    filteringBy: 'Filtering by:',
    foundArticles: 'Found {count} articles',
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<'all' | 'recommended' | 'most-viewed' | 'asc' | 'desc'>('all');

  const allTags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Performance', 'Design'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0;

  const sortOptions = [
    { key: 'all', label: t.sortAll, icon: null },
    { key: 'recommended', label: t.sortRecommended, icon: <Sparkles className="h-3 w-3" /> },
    { key: 'most-viewed', label: t.sortMostViewed, icon: <TrendingUp className="h-3 w-3" /> },
    { key: 'desc', label: t.sortDescending, icon: <ArrowDownAZ className="h-3 w-3" /> },
    { key: 'asc', label: t.sortAscending, icon: <ArrowUpAZ className="h-3 w-3" /> },
  ];

  return (
    <div className="space-y-4 mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 pointer-events-none z-10" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            accent="amber"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Dropdown>
          <DropdownTrigger asChild>
            <button className="flex items-center gap-2 shrink-0 px-3 py-2 rounded-lg border border-foreground/15 text-sm font-medium text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t.tags}</span>
              {selectedTags.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-primary/20 text-primary">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </DropdownTrigger>
          <DropdownContent align="end" className="w-56">
            <DropdownLabel>{t.filterByTags}</DropdownLabel>
            <DropdownSeparator className="h-px mx-2 my-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="max-h-[300px] overflow-y-auto">
              {allTags.map(tag => (
                <DropdownCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownCheckboxItem>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <>
                <DropdownSeparator className="h-px mx-2 my-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="px-2 py-1.5">
                  <button
                    onClick={clearFilters}
                    className="w-full text-xs px-2 py-1.5 rounded text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    {t.clearAll}
                  </button>
                </div>
              </>
            )}
          </DropdownContent>
        </Dropdown>
      </div>

      <div className="flex items-center justify-center gap-3 w-full">
        <span className="text-xs text-foreground/35 font-medium tracking-wide uppercase shrink-0 hidden sm:block">{t.sortBy}</span>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap">
          {sortOptions.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setSortBy(key as any)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97] border shrink-0 ${
                sortBy === key
                  ? 'bg-primary/15 border-primary/40 text-primary'
                  : 'bg-transparent border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/80'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-foreground/40">{t.filteringBy}</span>
          {selectedTags.map(tag => (
            <button key={tag} onClick={() => toggleTag(tag)} className="flex items-center gap-1">
              <Pill variant="solid" accent="amber">
                {tag} <X className="h-3 w-3" />
              </Pill>
            </button>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <div className="text-sm text-muted-foreground">
          {t.foundArticles.replace('{count}', '5')}
        </div>
      )}
    </div>
  );
}

const messages = {
  blog: {
    searchPlaceholder: 'Search articles...',
    tags: 'Tags',
    filterByTags: 'Filter by tags',
    clearAll: 'Clear all',
    sortBy: 'Sort by',
    sortAll: 'All',
    sortRecommended: 'Recommended',
    sortMostViewed: 'Most Viewed',
    sortDescending: 'Newest',
    sortAscending: 'Oldest',
    filteringBy: 'Filtering by:',
    foundArticles: 'Found {count} articles',
  },
};

const meta: Meta<typeof MockBlogSearch> = {
  title: 'Blog/BlogSearch',
  component: MockBlogSearch,
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
type Story = StoryObj<typeof MockBlogSearch>;

export const Default: Story = {
  render: () => <MockBlogSearch />,
  parameters: {
    docs: {
      description: {
        story: 'BlogSearch component provides search, tag filtering, and sorting for blog posts. This mock version demonstrates the UI with static data.',
      },
    },
  },
};

export const WithSearch: Story = {
  render: () => {
    const Component = () => {
      const [searchQuery, setSearchQuery] = React.useState('React');
      return <MockBlogSearch />;
    };
    return <Component />;
  },
};
