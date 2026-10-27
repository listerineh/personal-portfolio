import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageSkeleton } from "@/components/ds/PageSkeleton";

const meta: Meta<typeof PageSkeleton> = {
  title: "DS/PageSkeleton",
  component: PageSkeleton,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageSkeleton>;

/** What a route shows while the next page renders on the server (each route's loading.tsx). */
export const Default: Story = {
  args: { label: "Loading page" },
};
