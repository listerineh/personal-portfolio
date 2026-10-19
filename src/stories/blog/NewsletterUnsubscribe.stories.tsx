import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewsletterUnsubscribe } from "@/components/blog/newsletter-unsubscribe";

const meta: Meta<typeof NewsletterUnsubscribe> = {
  title: "Blog/NewsletterUnsubscribe",
  component: NewsletterUnsubscribe,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NewsletterUnsubscribe>;

/** Arriving from a newsletter email: the signed link is already in hand, one button confirms. */
export const FromEmailLink: Story = {
  args: { email: "reader@example.com", token: "signed-token" },
};

/**
 * No link (an old email, or typed URL): asks for the address. Submitting shows "link sent";
 * the mocked route answers with a failure for any address starting with `fail`.
 */
export const RequestLink: Story = { args: {} };

/** An expired or altered link: confirming falls back to the request form with an explanation. */
export const ExpiredLink: Story = {
  args: { email: "reader@example.com", token: "expired" },
};
