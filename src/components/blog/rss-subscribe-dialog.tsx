'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rss, Copy, Check, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function RssSubscribeDialog() {
  const [copied, setCopied] = useState(false);
  const rssUrl = 'https://listerineh.dev/feed.xml';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rssUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const popularReaders = [
    { name: 'Feedly', url: `https://feedly.com/i/subscription/feed/${encodeURIComponent(rssUrl)}` },
    { name: 'Inoreader', url: `https://www.inoreader.com/?add_feed=${encodeURIComponent(rssUrl)}` },
    { name: 'The Old Reader', url: `https://theoldreader.com/feeds/subscribe?url=${encodeURIComponent(rssUrl)}` },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Rss className="h-4 w-4" />
          Subscribe via RSS
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rss className="h-5 w-5 text-primary" />
            Subscribe to Blog Updates
          </DialogTitle>
          <DialogDescription>
            Get notified when new articles are published. Choose your preferred RSS reader below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* RSS URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">RSS Feed URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={rssUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-muted rounded-md border border-border"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={copyToClipboard}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Popular Readers */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Subscribe</label>
            <p className="text-xs text-muted-foreground">
              Click to subscribe using one of these popular RSS readers:
            </p>
            <div className="grid gap-2">
              {popularReaders.map((reader) => (
                <Button
                  key={reader.name}
                  variant="outline"
                  className="justify-between"
                  asChild
                >
                  <a href={reader.url} target="_blank" rel="noopener noreferrer">
                    <span>{reader.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-muted p-3 rounded-lg text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">What is RSS?</p>
            <p>
              RSS lets you follow blogs and websites in one place. When I publish a new article, 
              it will automatically appear in your RSS reader.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
