'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp, Heart, Flame, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const reactionConfig = {
  like: { 
    icon: ThumbsUp, 
    label: 'Helpful', 
    emoji: '👍',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hoverBg: 'hover:bg-blue-500/20',
    activeBg: 'bg-blue-500/20',
  },
  love: { 
    icon: Heart, 
    label: 'Loved it', 
    emoji: '❤️',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    hoverBg: 'hover:bg-red-500/20',
    activeBg: 'bg-red-500/20',
  },
  fire: { 
    icon: Flame, 
    label: 'Amazing', 
    emoji: '🔥',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    hoverBg: 'hover:bg-orange-500/20',
    activeBg: 'bg-orange-500/20',
  },
  idea: { 
    icon: Lightbulb, 
    label: 'Insightful', 
    emoji: '💡',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    hoverBg: 'hover:bg-yellow-500/20',
    activeBg: 'bg-yellow-500/20',
  },
};

export function BlogReactions({ slug }: BlogReactionsProps) {
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
        setIsLoading(false);
      }
    };

    const savedReactions = localStorage.getItem(`reactions:${slug}`);
    if (savedReactions) {
      setUserReactions(new Set(JSON.parse(savedReactions)));
    }

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
      <div className="flex items-center gap-3 p-6 bg-muted/30 rounded-xl border border-border/50">
        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        <span className="text-sm text-muted-foreground">Loading reactions...</span>
      </div>
    );
  }

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border border-border/50">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          {totalReactions > 0 
            ? `${totalReactions} ${totalReactions === 1 ? 'person' : 'people'} reacted` 
            : 'Be the first to react!'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.keys(reactionConfig) as Array<keyof Reactions>).map((type) => {
          const config = reactionConfig[type];
          const Icon = config.icon;
          const count = reactions[type];
          const hasReacted = userReactions.has(type);

          return (
            <button
              key={type}
              onClick={() => handleReaction(type)}
              disabled={hasReacted}
              className={cn(
                'group relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200',
                'hover:shadow-md active:scale-95',
                hasReacted 
                  ? `${config.activeBg} ${config.color} border-current cursor-default` 
                  : `border-border/50 ${config.hoverBg} hover:border-border hover:-translate-y-1`,
                !hasReacted && 'hover:shadow-lg'
              )}
            >
              <div className="relative">
                <span className="text-2xl transition-transform group-hover:scale-110">
                  {config.emoji}
                </span>
                {hasReacted && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    ✓
                  </span>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <span className={cn(
                  'text-xs font-medium transition-colors',
                  hasReacted ? config.color : 'text-muted-foreground group-hover:text-foreground'
                )}>
                  {config.label}
                </span>
                {count > 0 && (
                  <span className={cn(
                    'text-xs font-bold',
                    hasReacted ? config.color : 'text-muted-foreground'
                  )}>
                    {count}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {userReactions.size > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            You reacted: {Array.from(userReactions).map(r => reactionConfig[r].emoji).join(' ')}
          </span>
        </div>
      )}
    </div>
  );
}
