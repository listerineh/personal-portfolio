import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Input } from '../../components/ds';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NextIntlClientProvider } from 'next-intl';

// Mock NewsletterSubscribe for Storybook
function MockNewsletterSubscribe({ variant = 'default' }: { variant?: 'default' | 'compact' | 'bare' }) {
  const t = {
    emailPlaceholder: 'Enter your email',
    compactPlaceholder: 'Email',
    subscribeButton: 'Subscribe',
    subscribingButton: 'Subscribing...',
    subscribedButton: 'Subscribed',
    compactSubscribeButton: 'Join',
    dontMissNextPost: "Don't miss the next post",
    invalidEmailMessage: 'Please enter a valid email',
    successMessage: 'Successfully subscribed!',
    errorMessage: 'Something went wrong',
    failedMessage: 'Failed to subscribe',
    secureLabel: 'Secure',
    privateLabel: 'Private',
  };

  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(t.invalidEmailMessage);
      return;
    }

    setStatus('loading');
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage(t.successMessage);
      setEmail('');
    }, 1500);
  };

  if (variant === 'bare') {
    return (
      <div
        className="w-full rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
      <form onSubmit={handleSubmit} className="space-y-3 w-full">
        <Input
          type="email"
          placeholder={t.emailPlaceholder}
          accent="amber"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/[0.08] border-white/[0.18] text-white/90 placeholder:text-white/35"
        />
        <Button
          type="submit"
          variant="primary"
          accent="amber"
          size="lg"
          disabled={status === 'loading' || status === 'success'}
          className="w-full justify-center text-black"
        >
          {status === 'loading' ? (
            <><Loader2 className="h-5 w-5 animate-spin" />{t.subscribingButton}</>
          ) : status === 'success' ? (
            <><CheckCircle2 className="h-5 w-5" />{t.subscribedButton}</>
          ) : (
            <><Mail className="h-5 w-5" />{t.subscribeButton}</>
          )}
        </Button>
        {message && (
          <div className={cn(
            'flex items-center gap-2 p-3 rounded-xl text-sm',
            status === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          )}>
            {status === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
            <p>{message}</p>
          </div>
        )}
        <div className="flex items-center justify-center gap-8 pt-1 text-[11px] text-white/35">
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            {t.secureLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            {t.privateLabel}
          </span>
        </div>
      </form>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <Input
              type="email"
              placeholder={t.compactPlaceholder}
              accent="amber"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            accent="amber"
            size="md"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              t.compactSubscribeButton
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
    <div className="w-full max-w-3xl mx-auto relative my-8 sm:my-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 blur-3xl opacity-30" />
      
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card/70 via-card/50 to-card/70 backdrop-blur-sm border border-border/40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-40" />
          
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
          
          <div className="relative p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6 sm:mb-8 space-y-2 sm:space-y-3">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-foreground tracking-tight">
                {t.dontMissNextPost}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                accent="amber"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="primary"
                accent="amber"
                size="lg"
                disabled={status === 'loading' || status === 'success'}
                className="w-full justify-center"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-5 w-5 animate-spin" />{t.subscribingButton}</>
                ) : status === 'success' ? (
                  <><CheckCircle2 className="h-5 w-5" />{t.subscribedButton}</>
                ) : (
                  <><Mail className="h-5 w-5" />{t.subscribeButton}</>
                )}
              </Button>

              {message && (
                <div className={cn(
                  'flex items-center gap-2 p-4 rounded-xl backdrop-blur-sm',
                  status === 'success' 
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
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

            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground/60">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t.secureLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t.privateLabel}
              </span>
            </div>
          </div>
          
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-accent/10 to-transparent rounded-br-3xl" />
        </div>
      </div>
    </div>
  );
}

const messages = {
  newsletter: {
    emailPlaceholder: 'Enter your email',
    compactPlaceholder: 'Email',
    subscribeButton: 'Subscribe',
    subscribingButton: 'Subscribing...',
    subscribedButton: 'Subscribed',
    compactSubscribeButton: 'Join',
    dontMissNextPost: "Don't miss the next post",
    invalidEmailMessage: 'Please enter a valid email',
    successMessage: 'Successfully subscribed!',
    errorMessage: 'Something went wrong',
    failedMessage: 'Failed to subscribe',
    secureLabel: 'Secure',
    privateLabel: 'Private',
  },
};

const meta: Meta<typeof MockNewsletterSubscribe> = {
  title: 'Blog/NewsletterSubscribe',
  component: MockNewsletterSubscribe,
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
type Story = StoryObj<typeof MockNewsletterSubscribe>;

export const Default: Story = {
  render: () => <MockNewsletterSubscribe />,
  parameters: {
    docs: {
      description: {
        story: 'NewsletterSubscribe component with default variant. This mock version simulates the subscription flow.',
      },
    },
  },
};

export const Compact: Story = {
  render: () => <MockNewsletterSubscribe variant="compact" />,
  parameters: {
    docs: {
      description: {
        story: 'Compact variant for inline newsletter subscription.',
      },
    },
  },
};

export const Bare: Story = {
  render: () => <MockNewsletterSubscribe variant="bare" />,
  parameters: {
    docs: {
      description: {
        story: 'Bare variant with dark theme styling for dark backgrounds.',
      },
    },
  },
};
