'use client';

import { useState, useMemo, useEffect, useCallback, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { X, Filter, TrendingUp, ArrowUpAZ, ArrowDownAZ, Star, Loader2 } from 'lucide-react';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownCheckboxItem, DropdownItem, DropdownLabel, DropdownSeparator, FilterTag, SearchField } from '@/components/ds';
import type { BlogPost } from '@/types';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';

type SortOption = 'all' | 'recommended' | 'most-viewed' | 'asc' | 'desc';

const RECOMMENDED_ORDER = RECOMMENDED_SLUGS;

interface BlogSearchProps {
  posts: BlogPost[];
  onFilteredPostsChange: (posts: BlogPost[]) => void;
  onLoadingChange?: (loading: boolean) => void;
}

export function BlogSearch({ posts, onFilteredPostsChange, onLoadingChange }: BlogSearchProps) {
  const t = useTranslations('blog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('all');
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [loadingViews, setLoadingViews] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const fetchAllViews = useCallback(async () => {
    if (Object.keys(viewCounts).length > 0) return;
    setLoadingViews(true);
    try {
      const results = await Promise.all(
        posts.map(async (post) => {
          const res = await fetch(`/api/blog/${post.slug}/views`);
          const data = await res.json();
          return [post.slug, data.views ?? 0] as [string, number];
        })
      );
      setViewCounts(Object.fromEntries(results));
    } catch {
      setViewCounts(Object.fromEntries(posts.map(p => [p.slug, 0])));
    } finally {
      setLoadingViews(false);
    }
  }, [posts, viewCounts]);

  // Views are fetched when the visitor asks for that order, not in an effect.
  const selectSort = (key: SortOption) => {
    setSortBy(key);
    if (key === 'most-viewed') void fetchAllViews();
  };

  useEffect(() => {
    onLoadingChange?.(loadingViews);
  }, [loadingViews, onLoadingChange]);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(tag => post.tags.includes(tag))
      );
    }

    if (sortBy === 'recommended') {
      return filtered.filter(post => RECOMMENDED_ORDER.includes(post.slug))
        .sort((a, b) => RECOMMENDED_ORDER.indexOf(a.slug) - RECOMMENDED_ORDER.indexOf(b.slug));
    }

    const sorted = [...filtered];
    if (sortBy === 'asc') {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'desc') {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'most-viewed' && Object.keys(viewCounts).length > 0) {
      sorted.sort((a, b) => (viewCounts[b.slug] ?? 0) - (viewCounts[a.slug] ?? 0));
    }

    return sorted;
  }, [posts, searchQuery, selectedTags, sortBy, viewCounts]);

  useEffect(() => {
    onFilteredPostsChange(filteredAndSortedPosts);
  }, [filteredAndSortedPosts, onFilteredPostsChange]);

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

  const sortOptions: { key: SortOption; label: string; icon: ReactNode }[] = [
    { key: 'all',          label: t('sortAll'),         icon: null },
    { key: 'recommended',  label: t('sortRecommended'), icon: <Star aria-hidden="true" className="h-3 w-3" /> },
    { key: 'most-viewed',  label: t('sortMostViewed'),  icon: loadingViews && sortBy === 'most-viewed' ? <Loader2 aria-hidden="true" className="h-3 w-3 animate-spin motion-reduce:animate-none" /> : <TrendingUp aria-hidden="true" className="h-3 w-3" /> },
    { key: 'desc',         label: t('sortDescending'),  icon: <ArrowDownAZ aria-hidden="true" className="h-3 w-3" /> },
    { key: 'asc',          label: t('sortAscending'),   icon: <ArrowUpAZ aria-hidden="true" className="h-3 w-3" /> },
  ];

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <SearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('searchPlaceholder')}
          label={t('searchPlaceholder')}
          clearLabel={t('clearAll')}
          className="flex-1"
        />

        <Dropdown>
          <DropdownTrigger asChild>
            <button
              type="button"
              aria-label={t('filterByTags')}
              className="panel inline-flex min-h-12 shrink-0 items-center gap-2 border border-input px-4 text-sm font-semibold transition-colors hover:border-foreground"
            >
              <Filter aria-hidden="true" className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tags')}</span>
              {selectedTags.length > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center bg-primary px-1 font-mono text-[0.6875rem] text-primary-foreground">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </DropdownTrigger>
          <DropdownContent align="end" className="w-64">
            <DropdownLabel>{t('filterByTags')}</DropdownLabel>
            <DropdownSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {allTags.map((tag) => (
                <DropdownCheckboxItem key={tag} checked={selectedTags.includes(tag)} onCheckedChange={() => toggleTag(tag)}>
                  {tag}
                </DropdownCheckboxItem>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <>
                <DropdownSeparator />
                <DropdownItem onClick={clearFilters}>{t('clearAll')}</DropdownItem>
              </>
            )}
          </DropdownContent>
        </Dropdown>
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('sortBy')}>
        <span className="text-meta mr-1 text-muted-foreground">{t('sortBy')}</span>
        {sortOptions.map(({ key, label, icon }) => (
          <FilterTag key={key} pressed={sortBy === key} onPressedChange={() => selectSort(key)} className="gap-1.5">
            {icon}
            {label}
          </FilterTag>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-meta mr-1 text-muted-foreground">{t('filteringBy')}</span>
          {selectedTags.map((tag) => (
            <FilterTag key={tag} pressed onPressedChange={() => toggleTag(tag)} className="gap-1.5">
              {tag}
              <X aria-hidden="true" className="h-3 w-3" />
            </FilterTag>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <p className="text-meta text-muted-foreground" aria-live="polite">
          {t('foundArticles', { count: filteredAndSortedPosts.length })}
        </p>
      )}
    </div>
  );
}
