import type { Meta, StoryObj } from '@storybook/react';
import { ShareButtons } from '../../components/blog/share-buttons';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  share: {
    shareArticle: 'Share Article',
    shareThisPost: 'Share this post',
    copyLink: 'Copy Link',
    linkCopied: 'Link Copied',
    shareOnX: 'Share on X',
    shareOnLinkedIn: 'Share on LinkedIn',
    shareOnFacebook: 'Share on Facebook',
    toastOpeningX: 'Opening X...',
    toastOpeningLinkedIn: 'Opening LinkedIn...',
    toastOpeningFacebook: 'Opening Facebook...',
    toastCopied: 'Link copied',
    toastCopiedDesc: 'The link has been copied to your clipboard',
  },
};

const meta: Meta<typeof ShareButtons> = {
  title: 'Blog/ShareButtons',
  component: ShareButtons,
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
type Story = StoryObj<typeof ShareButtons>;

export const Default: Story = {
  render: () => (
    <ShareButtons 
      title="My Amazing Blog Post" 
      url="https://listerineh.dev/blog/my-amazing-post" 
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'ShareButtons component provides social media sharing options with mobile and desktop layouts.',
      },
    },
  },
};

export const ShortTitle: Story = {
  render: () => (
    <ShareButtons 
      title="Post" 
      url="https://listerineh.dev/blog/post" 
    />
  ),
};
