import { Fragment, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// **bold**, *italic*, `code`, ==highlight==, [label](https://…). One level, no nesting: enough for slides, and it never
// renders HTML from the deck.
const TOKEN = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|==[^=]+==|\[[^\]]+\]\(https:\/\/[^)\s]+\))/g;

export function parseRichText(source: string): ReactNode[] {
  return source.split(TOKEN).map((part, index) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('==') && part.endsWith('==') && part.length > 4) return <mark key={index}>{part.slice(2, -2)}</mark>;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = /^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function RichText({ text, as: Tag = 'span', className }: { text: string; as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li' | 'blockquote'; className?: string }) {
  return <Tag className={cn('sl-rich', className)}>{parseRichText(text)}</Tag>;
}
