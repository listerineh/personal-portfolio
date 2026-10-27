import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageSkeleton } from "@/components/ds/PageSkeleton";
import { PageHeader } from "@/components/ds/PageHeader";
import { ProjectCard } from "@/components/ds/ProjectCard";

const meta: Meta<typeof PageSkeleton> = {
  title: "DS/PageSkeleton",
  component: PageSkeleton,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageSkeleton>;

/** A route's loading state: its own components with placeholder data, drawn as soft shapes (each route's loading.tsx). */
export const FromPageComponents: Story = {
  render: () => (
    <main>
      <PageSkeleton label="Loading page">
        <PageHeader
          title="Projects"
          intro="Products and tools I have designed and built, from the first sketch to production."
        >
          <div className="h-12 rounded-full bg-foreground/[0.06]" />
        </PageHeader>
        <div className="px-gutter pb-16">
          <ul className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((n) => (
              <li key={n}>
                <ProjectCard
                  slug={`loading-${n}`}
                  title="Placeholder project"
                  description="A short description of about the length a real project has, so the card wraps the same way."
                  tags={["React", "TypeScript"]}
                  viewMoreLabel="View project"
                />
              </li>
            ))}
          </ul>
        </div>
      </PageSkeleton>
    </main>
  ),
};
