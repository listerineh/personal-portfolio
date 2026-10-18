'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ThumbsUp, Heart, Flame, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Reactions {
  like: number;
  love: number;
  fire: number;
  idea: number;
}

interface BlogReactionsProps {
  slug: string;
}

const getReactionConfig = (t: (key: 'reactionHelpful' | 'reactionLoved' | 'reactionAmazing' | 'reactionInsightful') => string) => ({
  like: { 
    icon: ThumbsUp, 
    label: t('reactionHelpful'), 
    emoji: '👍',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hoverBg: 'hover:bg-blue-500/20',
    activeBg: 'bg-blue-500/20',
  },
  love: { 
    icon: Heart, 
    label: t('reactionLoved'), 
    emoji: '❤️',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    hoverBg: 'hover:bg-red-500/20',
    activeBg: 'bg-red-500/20',
  },
  fire: { 
    icon: Flame, 
    label: t('reactionAmazing'), 
    emoji: '🔥',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    hoverBg: 'hover:bg-orange-500/20',
    activeBg: 'bg-orange-500/20',
  },
  idea: { 
    icon: Lightbulb, 
    label: t('reactionInsightful'), 
    emoji: '💡',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    hoverBg: 'hover:bg-yellow-500/20',
    activeBg: 'bg-yellow-500/20',
  },
});

export function BlogReactions({ slug }: BlogReactionsProps) {
  const t = useTranslations('blog');
  const reactionConfig = getReactionConfig(t);
  const [reactions, setReactions] = useState<Reactions>({ like: 0, love: 0, fire: 0, idea: 0 });
  const [userReactions, setUserReactions] = useState<Set<keyof Reactions>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}/reactions`);
        const data = await response.json();
        setReactions(data);
      } catch (error) {
        console.error('Error fetching reactions:', error);
      } finally {
        const savedReactions = localStorage.getItem(`reactions:${slug}`);
        if (savedReactions) setUserReactions(new Set(JSON.parse(savedReactions)));
        setIsLoading(false);
      }
    };

    fetchReactions();
  }, [slug]);

  const handleReaction = async (reactionType: keyof Reactions) => {
    if (userReactions.has(reactionType)) {
      return;
    }

    const optimisticReactions = { ...reactions };
    optimisticReactions[reactionType]++;
    setReactions(optimisticReactions);

    const newUserReactions = new Set(userReactions);
    newUserReactions.add(reactionType);
    setUserReactions(newUserReactions);

    try {
      const response = await fetch(`/api/blog/${slug}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction: reactionType }),
      });

      const data = await response.json();

      if (!data.alreadyReacted) {
        setReactions(data);
        localStorage.setItem(`reactions:${slug}`, JSON.stringify(Array.from(newUserReactions)));
      } else {
        setReactions(reactions);
        setUserReactions(userReactions);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
      setReactions(reactions);
      setUserReactions(userReactions);
    }
  };

  if (isLoading) {
    return (
      <p className="text-meta text-muted-foreground" aria-live="polite">
        {t('loadingReactions')}
      </p>
    );
  }

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);
  const types = Object.keys(reactionConfig) as Array<keyof Reactions>;

  return (
    <div>
      <p className="text-meta text-muted-foreground" aria-live="polite">
        {totalReactions > 0
          ? `${totalReactions} ${totalReactions === 1 ? t('reaction') : t('reactions')}`
          : t('shareYourReaction')}
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {types.map((type) => {
          const config = reactionConfig[type];
          const Icon = config.icon;
          const count = reactions[type];
          const hasReacted = userReactions.has(type);
          return (
            <li key={type}>
              <button
                type="button"
                onClick={() => handleReaction(type)}
                disabled={hasReacted}
                aria-pressed={hasReacted}
                className={cn(
                  'inline-flex min-h-11 w-full items-center gap-2 rounded-full px-4 text-sm font-medium transition-[background-color,color,transform] duration-bounce ease-bounce motion-reduce:transition-none',
                  hasReacted
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-foreground/[0.06] text-foreground hover:bg-foreground/[0.1] active:scale-95',
                )}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                <span>{config.label}</span>
                {count > 0 && <span className="ml-auto text-xs font-semibold tabular-nums sm:ml-1">{count}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
