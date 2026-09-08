import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThumbsUp, Heart, Flame, Lightbulb, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NextIntlClientProvider } from 'next-intl';

// Mock BlogReactions for Storybook
function MockBlogReactions({ initialReactions = { like: 42, love: 28, fire: 15, idea: 8 } }: { initialReactions?: { like: number; love: number; fire: number; idea: number } }) {
  const t = {
    loadingReactions: 'Loading reactions...',
    shareYourReaction: 'Share your reaction',
    reaction: 'reaction',
    reactions: 'reactions',
    you: 'You',
    reactionHelpful: 'Helpful',
    reactionLoved: 'Loved',
    reactionAmazing: 'Amazing',
    reactionInsightful: 'Insightful',
  };

  const reactionConfig = {
    like: { 
      icon: ThumbsUp, 
      label: t.reactionHelpful, 
      emoji: '👍',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      hoverBg: 'hover:bg-blue-500/20',
      activeBg: 'bg-blue-500/20',
    },
    love: { 
      icon: Heart, 
      label: t.reactionLoved, 
      emoji: '❤️',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      hoverBg: 'hover:bg-red-500/20',
      activeBg: 'bg-red-500/20',
    },
    fire: { 
      icon: Flame, 
      label: t.reactionAmazing, 
      emoji: '🔥',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      hoverBg: 'hover:bg-orange-500/20',
      activeBg: 'bg-orange-500/20',
    },
    idea: { 
      icon: Lightbulb, 
      label: t.reactionInsightful, 
      emoji: '💡',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      hoverBg: 'hover:bg-yellow-500/20',
      activeBg: 'bg-yellow-500/20',
    },
  };

  const [reactions, setReactions] = React.useState(initialReactions);
  const [userReactions, setUserReactions] = React.useState<Set<keyof typeof initialReactions>>(new Set());

  const handleReaction = (reactionType: keyof typeof initialReactions) => {
    if (userReactions.has(reactionType)) return;
    
    const newReactions = { ...reactions };
    newReactions[reactionType]++;
    setReactions(newReactions);
    
    const newUserReactions = new Set(userReactions);
    newUserReactions.add(reactionType);
    setUserReactions(newUserReactions);
  };

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="relative my-12">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-[60px] opacity-20" />
      
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-xl border border-border/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-50" />
          
          <div className="absolute inset-0 opacity-[0.01]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
          
          <div className="relative p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold text-foreground">
                  {totalReactions > 0 
                    ? `${totalReactions} ${totalReactions === 1 ? t.reaction : t.reactions}` 
                    : t.shareYourReaction}
                </span>
              </div>
              {userReactions.size > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-xs font-medium text-primary">
                    {t.you}: {Array.from(userReactions).map(r => reactionConfig[r].emoji).join(' ')}
                  </span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(reactionConfig) as Array<keyof typeof initialReactions>).map((type) => {
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
                      'group relative flex flex-col items-center gap-3 p-5 rounded-xl transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out',
                      'bg-background/40 backdrop-blur-sm border',
                      hasReacted 
                        ? `${config.activeBg} ${config.color} border-current shadow-lg scale-105` 
                        : 'border-border/40 hover:border-border hover:bg-background/60 hover:shadow-md hover:-translate-y-0.5 active:scale-95',
                    )}
                  >
                    <div className="relative">
                      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                        {config.emoji}
                      </span>
                      {hasReacted && (
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-md">
                          ✓
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <span className={cn(
                        'text-xs font-semibold transition-colors',
                        hasReacted ? config.color : 'text-muted-foreground group-hover:text-foreground'
                      )}>
                        {config.label}
                      </span>
                      {count > 0 && (
                        <span className={cn(
                          'text-sm font-bold tabular-nums',
                          hasReacted ? config.color : 'text-muted-foreground/60'
                        )}>
                          {count}
                        </span>
                      )}
                    </div>
                    
                    {!hasReacted && (
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/5 to-transparent rounded-bl-2xl" />
        </div>
      </div>
    </div>
  );
}

const messages = {
  blog: {
    loadingReactions: 'Loading reactions...',
    shareYourReaction: 'Share your reaction',
    reaction: 'reaction',
    reactions: 'reactions',
    you: 'You',
    reactionHelpful: 'Helpful',
    reactionLoved: 'Loved',
    reactionAmazing: 'Amazing',
    reactionInsightful: 'Insightful',
  },
};

const meta: Meta<typeof MockBlogReactions> = {
  title: 'Blog/BlogReactions',
  component: MockBlogReactions,
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
type Story = StoryObj<typeof MockBlogReactions>;

export const Default: Story = {
  render: () => <MockBlogReactions />,
  parameters: {
    docs: {
      description: {
        story: 'BlogReactions component allows users to react to blog posts. This mock version demonstrates the UI with static data.',
      },
    },
  },
};

export const NoReactions: Story = {
  render: () => <MockBlogReactions initialReactions={{ like: 0, love: 0, fire: 0, idea: 0 }} />,
};

export const HighEngagement: Story = {
  render: () => <MockBlogReactions initialReactions={{ like: 156, love: 89, fire: 67, idea: 34 }} />,
};
