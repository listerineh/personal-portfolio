/**
 * Gives h2/h3 in rendered markdown a stable id on the server, using the same slug rule
 * the table of contents reads back from the DOM.
 */
type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

export function rehypeHeadingIds() {
  return (tree: HastNode) => {
    let index = 0;
    const walk = (node: HastNode) => {
      if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
        node.properties = { ...node.properties, id: headingSlug(textOf(node)) || `heading-${index}` };
        index += 1;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
