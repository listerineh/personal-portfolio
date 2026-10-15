import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CodeBlockCopyButton } from '../../components/blog/code-block-copy-button';

const meta: Meta<typeof CodeBlockCopyButton> = {
  title: 'Blog/CodeBlockCopyButton',
  component: CodeBlockCopyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeBlockCopyButton>;

export const Default: Story = {
  render: () => (
    <div className="plaque relative h-32 w-64 p-4">
      <pre className="text-xs text-muted-foreground">{'const example = "code here";'}</pre>
      <CodeBlockCopyButton code="const example = 'code here';" />
    </div>
  ),
};

export const LongCode: Story = {
  render: () => (
    <div className="relative w-80 h-40 bg-foreground/5 rounded-lg border border-foreground/10 p-4">
      <pre className="text-xs text-foreground/60">function complexFunction() &#123; return true; &#125;</pre>
      <CodeBlockCopyButton code="function complexFunction() { return true; }" />
    </div>
  ),
};
