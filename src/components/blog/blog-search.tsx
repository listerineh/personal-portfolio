'use client';

import { useState, useMemo, useEffect, useCallback, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X, Filter, TrendingUp, ArrowUpAZ, ArrowDownAZ, Sparkles, Loader2 } from 'lucide-react';
import { Input, Pill, Dropdown, DropdownTrigger, DropdownContent, DropdownCheckboxItem, DropdownLabel, DropdownSeparator } from '@/components/ds';
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

  useEffect(() => {
    if (sortBy === 'most-viewed') {
      fetchAllViews();
    }
  }, [sortBy, fetchAllViews]);

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
    { key: 'recommended',  label: t('sortRecommended'), icon: <Sparkles className="h-3 w-3" /> },
    { key: 'most-viewed',  label: t('sortMostViewed'),  icon: loadingViews && sortBy === 'most-viewed' ? <Loader2 className="h-3 w-3 animate-spin" /> : <TrendingUp className="h-3 w-3" /> },
    { key: 'desc',         label: t('sortDescending'),  icon: <ArrowDownAZ className="h-3 w-3" /> },
    { key: 'asc',          label: t('sortAscending'),   icon: <ArrowUpAZ className="h-3 w-3" /> },
  ];

  return (
    <div className="space-y-4 mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 pointer-events-none z-10" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
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
              <span className="hidden sm:inline">{t('tags')}</span>
              {selectedTags.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-primary/20 text-primary">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </DropdownTrigger>
          <DropdownContent align="end" className="w-56">
            <DropdownLabel>{t('filterByTags')}</DropdownLabel>
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
                    {t('clearAll')}
                  </button>
                </div>
              </>
            )}
          </DropdownContent>
        </Dropdown>
      </div>

      <div className="flex items-center justify-center gap-3 w-full">
        <span className="text-xs text-foreground/35 font-medium tracking-wide uppercase shrink-0 hidden sm:block">{t('sortBy')}</span>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap">
          {sortOptions.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border shrink-0 ${
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
          <span className="text-xs text-foreground/40">{t('filteringBy')}</span>
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
          {t('foundArticles', { count: filteredAndSortedPosts.length })}
        </div>
      )}
    </div>
  );
}
