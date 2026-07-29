import type { Meta, StoryObj } from '@storybook/react';
import { NewsletterSignup } from '../../components/common/newsletter-signup';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  blog: {
    stayUpdated: 'Stay Updated',
    stayUpdatedDescription: 'Get the latest articles and updates delivered to your inbox.',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing...',
    subscribeToastTitle: 'Success',
    subscribeToastDescription: 'You have been subscribed to the newsletter.',
    errorToastTitle: 'Error',
    errorToastDescription: 'Failed to subscribe. Please try again.',
    successfullySubscribed: 'Successfully subscribed!',
    failedToSubscribe: 'Failed to subscribe. Please try again.',
    privacyNote: 'We respect your privacy. Unsubscribe at any time.',
  },
};

const meta: Meta<typeof NewsletterSignup> = {
  title: 'Common/NewsletterSignup',
  component: NewsletterSignup,
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
type Story = StoryObj<typeof NewsletterSignup>;

export const Default: Story = {
  render: () => <NewsletterSignup />,
  parameters: {
    docs: {
      description: {
        story: 'NewsletterSignup component uses next-intl for translations and makes API calls to /api/newsletter/subscribe. In Storybook, the API call will fail but the form will still be interactive.',
      },
    },
  },
};
