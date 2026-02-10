'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Link2, Sparkles } from 'lucide-react';
import { shareButtonsConfig } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    const text = `Check out this article: "${title}"\n\n${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`Check out this article: "${title}"`)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="lg"
            className="relative gap-2 group bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80 hover:border-primary/50 hover:shadow-lg transition-all duration-200"
          >
            <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-semibold">{shareButtonsConfig.shareArticleText}</span>
            <Sparkles className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-64 p-2 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl"
        >
          <div className="px-3 py-2 mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{shareButtonsConfig.shareThisPostLabel}</p>
          </div>
          
          <DropdownMenuItem 
            onClick={copyToClipboard} 
            className={cn(
              "cursor-pointer transition-all duration-200 rounded-lg px-3 py-2.5 mb-1",
              copied 
                ? "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30" 
                : "hover:bg-primary/10 hover:border-primary/20 border border-transparent"
            )}
          >
            {copied ? (
              <>
                <Check className="mr-3 h-4 w-4 text-green-500" />
                <span className="font-medium">{shareButtonsConfig.linkCopiedText}</span>
              </>
            ) : (
              <>
                <Link2 className="mr-3 h-4 w-4" />
                <span className="font-medium">{shareButtonsConfig.copyLinkText}</span>
              </>
            )}
          </DropdownMenuItem>
          
          <div className="h-px bg-border/50 my-2" />
          
          <DropdownMenuItem 
            onClick={shareOnTwitter} 
            className="cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/20 border border-transparent transition-all duration-200 rounded-lg px-3 py-2.5 mb-1"
          >
            <svg className="mr-3 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="font-medium">{shareButtonsConfig.shareOnXText}</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={shareOnLinkedIn} 
            className="cursor-pointer hover:bg-blue-600/10 hover:border-blue-600/20 border border-transparent transition-all duration-200 rounded-lg px-3 py-2.5 mb-1"
          >
            <svg className="mr-3 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="font-medium">{shareButtonsConfig.shareOnLinkedInText}</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={shareOnFacebook} 
            className="cursor-pointer hover:bg-blue-700/10 hover:border-blue-700/20 border border-transparent transition-all duration-200 rounded-lg px-3 py-2.5"
          >
            <svg className="mr-3 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="font-medium">{shareButtonsConfig.shareOnFacebookText}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
