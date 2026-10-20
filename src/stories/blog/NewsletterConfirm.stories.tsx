import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewsletterConfirm } from "@/components/blog/newsletter-confirm";

const meta: Meta<typeof NewsletterConfirm> = {
  title: "Blog/NewsletterConfirm",
  component: NewsletterConfirm,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NewsletterConfirm>;

const link = { email: "reader@example.com", expires: "1893456000", token: "signed-token" };

/** From the "confirm your subscription" email: one button confirms (mail scanners never press it). */
export const FromEmailLink: Story = { args: link };

/** The address was already on the list: no second welcome email. */
export const AlreadySubscribed: Story = { args: { ...link, email: "already@example.com" } };

/** Expired (after 7 days) or altered link: it offers the form again, which sends a fresh link. */
export const ExpiredLink: Story = { args: { ...link, token: "expired" } };

/** Opened without the link's parameters. */
export const MissingLink: Story = { args: {} };
