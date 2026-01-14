'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterSubscribeProps {
  variant?: 'default' | 'compact';
}

export function NewsletterSubscribe({ variant = 'default' }: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again later.');
    }
  };

  if (variant === 'compact') {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            className="shrink-0"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
        {message && (
          <p className={cn(
            'text-sm mt-2',
            status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          )}>
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-headline font-bold text-foreground mb-2">
            Subscribe to my newsletter
          </h3>
          <p className="text-muted-foreground">
            Get notified when I publish new blog posts. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          className="w-full h-16 text-lg px-6"
        />
        <Button 
          type="submit" 
          size="lg"
          disabled={status === 'loading' || status === 'success'}
          className="w-full h-14"
        >
            {status === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Subscribed!
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </>
            )}
          </Button>

        {message && (
          <div className={cn(
            'flex items-center gap-2 p-4 rounded-lg',
            status === 'success' 
              ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          )}>
            {status === 'success' ? (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}
      </form>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        By subscribing, you agree to receive emails from me. You can unsubscribe at any time.
      </p>
    </div>
  );
}
