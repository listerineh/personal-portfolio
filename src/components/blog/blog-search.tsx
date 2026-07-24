'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X, Filter } from 'lucide-react';
import { Input, Pill, Dropdown, DropdownTrigger, DropdownContent, DropdownCheckboxItem, DropdownLabel, DropdownSeparator } from '@/components/ds';
import type { BlogPost } from '@/types';

interface BlogSearchProps {
  posts: BlogPost[];
  onFilteredPostsChange: (posts: BlogPost[]) => void;
}

export function BlogSearch({ posts, onFilteredPostsChange }: BlogSearchProps) {
  const t = useTranslations('blog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
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

    return filtered;
  }, [posts, searchQuery, selectedTags]);

  useEffect(() => {
    onFilteredPostsChange(filteredPosts);
  }, [filteredPosts, onFilteredPostsChange]);

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
              {t('tags')}
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
          {t('foundArticles', { count: filteredPosts.length })}
        </div>
      )}
    </div>
  );
}
