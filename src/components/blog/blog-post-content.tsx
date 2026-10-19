import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import { rehypeHeadingIds } from '@/lib/rehype-heading-ids';

interface BlogPostContentProps {
  content: string;
}

/**
 * Server-rendered article body: markdown, sanitizing and syntax highlighting never ship to the client.
 * Heading ids are added after sanitizing so the table of contents can link to them.
 */
export function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="prose prose-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight, rehypeHeadingIds]}
        components={{
          a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
