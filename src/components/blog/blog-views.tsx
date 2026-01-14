'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface BlogViewsProps {
  slug: string;
}

export function BlogViews({ slug }: BlogViewsProps) {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}/views`);
        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error('Error fetching views:', error);
        setViews(0);
      } finally {
        setIsLoading(false);
      }
    };

    const incrementView = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}/views`, {
          method: 'POST',
        });
        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error('Error incrementing view:', error);
      }
    };

    fetchViews();
    
    const timer = setTimeout(() => {
      incrementView();
    }, 3000);

    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Eye className="h-4 w-4 animate-pulse" />
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>
        {views !== null ? (
          <>
            <strong className="text-foreground">{views.toLocaleString()}</strong> view{views !== 1 ? 's' : ''}
          </>
        ) : (
          '0 views'
        )}
      </span>
    </div>
  );
}
