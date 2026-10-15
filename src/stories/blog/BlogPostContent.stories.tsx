import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BlogPostContent } from '@/components/blog/blog-post-content';

// Illustrative article used only in this story.
const sample = `## Why the stack matters

Choosing **boring infrastructure** lets the interesting parts of a product move fast. Read more in the [Next.js docs](https://nextjs.org/docs).

### A small handler

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
\`\`\`

> Ship the smallest thing that proves the idea, then harden it.

- Typed APIs with Pydantic
- Terraform for every environment
- Observability before scale

| Layer | Tool |
| --- | --- |
| API | FastAPI |
| Infra | Terraform |
`;

const meta: Meta<typeof BlogPostContent> = {
  title: 'Blog/BlogPostContent',
  component: BlogPostContent,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: { content: sample },
};

export default meta;
type Story = StoryObj<typeof BlogPostContent>;

/** Prose at 68ch with Sala headings, amber-underlined links, plaque code blocks and the syntax palette. */
export const Default: Story = {};
