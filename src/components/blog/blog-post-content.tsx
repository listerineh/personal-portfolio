'use client';

import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';

interface BlogPostContentProps {
  content: string;
}

export const BlogPostContent = forwardRef<HTMLDivElement, BlogPostContentProps>(
  ({ content }, ref) => {
    return (
      <div 
        ref={ref}
        className="prose dark:prose-invert max-w-none
                   prose-headings:font-headline prose-headings:font-bold prose-headings:text-foreground
                   prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                   prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-8 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                   prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
                   prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-5
                   prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                   prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                   prose-strong:text-foreground prose-strong:font-semibold
                   prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic
                   prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-code prose-code:text-sm
                   prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
                   prose-pre:bg-muted prose-pre:p-6 prose-pre:rounded-xl prose-pre:font-code prose-pre:shadow-lg
                   prose-ul:my-6 prose-ol:my-6 prose-li:my-2
                   prose-img:rounded-xl prose-img:shadow-lg"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }
);

BlogPostContent.displayName = 'BlogPostContent';
