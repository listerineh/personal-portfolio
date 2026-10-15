'use client';

import { forwardRef, useEffect } from 'react';
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
    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        const links = ref.current.querySelectorAll('a');
        links.forEach((link) => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        });
      }
    }, [content, ref]);

    return (
      <div 
        ref={ref}
        className="prose prose-sala"
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
