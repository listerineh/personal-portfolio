import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Directory } from "@/components/ds/Directory";
import { Wall } from "@/components/ds/Wall";

const meta: Meta<typeof Directory> = {
  title: "DS/Directory",
  component: Directory,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    label: "Route",
    stops: [
      { number: "01", name: "Work", href: "#work" },
      { number: "02", name: "Writing", href: "#writing" },
      { number: "03", name: "Career", href: "#career" },
      { number: "04", name: "Craft", href: "#craft" },
      { number: "05", name: "Contact", href: "#contact" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Directory>;

export const Default: Story = {
  render: (args) => <Directory {...args} className="max-w-sm" />,
};

export const OnWall: Story = {
  render: (args) => (
    <Wall className="py-12">
      <Directory {...args} className="max-w-sm" />
    </Wall>
  ),
};
