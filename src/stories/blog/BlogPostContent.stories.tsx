import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';

// Mock BlogPostContent for Storybook
function MockBlogPostContent({ content }: { content?: string }) {
  const mockContent = content || `# Getting Started with React Hooks

React Hooks have revolutionized how we write React components. They allow us to use state and other React features without writing a class.

## Why Use Hooks?

Hooks provide several benefits:

- **Cleaner code** - No more class components
- **Better composition** - Reusable stateful logic
- **Easier testing** - Simpler component structure
- **TypeScript support** - Excellent type inference

## Basic Hooks

### useState

The \`useState\` hook lets you add state to functional components:

\`\`\`typescript
const [count, setCount] = useState(0);
\`\`\`

### useEffect

The \`useEffect\` hook lets you perform side effects in functional components:

\`\`\`typescript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Advanced Patterns

You can create custom hooks to reuse stateful logic:

\`\`\`typescript
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  // ... implementation
  return size;
}
\`\`\`

> **Pro tip:** Custom hooks are a powerful way to share logic between components without prop drilling.

## Best Practices

1. **Follow the Rules of Hooks** - Only call hooks at the top level
2. **Keep hooks simple** - Split complex logic into smaller hooks
3. **Use TypeScript** - Get better type safety and autocomplete
4. **Test your hooks** - Write unit tests for custom hooks

## Conclusion

React Hooks provide a modern way to write React components. By mastering them, you'll write cleaner, more maintainable code.

*Happy coding!*`;

  return (
    <div className="prose dark:prose-invert max-w-none
                prose-headings:font-headline prose-headings:font-bold prose-headings:text-foreground
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-3xl prose-h2:!mb-8 prose-h2:!mt-10 prose-h2:border-b prose-h2:border-border prose-h2:!pb-4
                prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
                prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-5
                prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l prose-blockquote:border-primary/30 prose-blockquote:pl-6 prose-blockquote:italic
                prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-code prose-code:text-sm
                prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted prose-pre:p-6 prose-pre:rounded-xl prose-pre:font-code prose-pre:shadow-lg
                prose-ul:my-6 prose-ol:my-6 prose-li:my-2
                prose-img:rounded-xl prose-img:shadow-lg prose-img:h-full prose-img:w-full prose-img:object-cover">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      >
        {mockContent}
      </ReactMarkdown>
    </div>
  );
}

const meta: Meta<typeof MockBlogPostContent> = {
  title: 'Blog/BlogPostContent',
  component: MockBlogPostContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MockBlogPostContent>;

export const Default: Story = {
  render: () => <MockBlogPostContent />,
  parameters: {
    docs: {
      description: {
        story: 'BlogPostContent component renders markdown content with proper styling. This example demonstrates headings, code blocks, lists, and blockquotes.',
      },
    },
  },
};

export const ShortContent: Story = {
  render: () => <MockBlogPostContent content={`# Quick Start

This is a short blog post with minimal content.

## Key Points

- Point one
- Point two
- Point three`} />,
  parameters: {
    docs: {
      description: {
        story: 'Example with minimal content for quick preview.',
      },
    },
  },
};

export const CodeHeavy: Story = {
  render: () => <MockBlogPostContent content={`# Code Examples

Here are some code examples:

## JavaScript

\`\`\`javascript
const greet = (name) => {
  return \`Hello, \${name}!\`;
};
\`\`\`

## TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: 'John' };
\`\`\`

## CSS

\`\`\`css
.container {
  max-width: 1200px;
  margin: 0 auto;
}
\`\`\``} />,
  parameters: {
    docs: {
      description: {
        story: 'Example focused on code blocks with syntax highlighting.',
      },
    },
  },
};

export const TextRich: Story = {
  render: () => <MockBlogPostContent content={`# Typography Examples

This post demonstrates various text styling options.

## Emphasis

You can use **bold text** for emphasis and *italic text* for subtle highlights.

## Lists

### Unordered List

- First item
- Second item
- Third item

### Ordered List

1. First step
- Sub-step
2. Second step
3. Third step

## Blockquotes

> This is a blockquote that highlights important information. It's great for tips, warnings, or key takeaways.

> Another blockquote for additional context.

## Mixed Content

You can combine **bold**, *italic*, and \`code\` in the same paragraph for rich formatting.`} />,
  parameters: {
    docs: {
      description: {
        story: 'Example demonstrating various text formatting options.',
      },
    },
  },
};

