import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Welcome to the design system documentation. This Storybook showcases all the reusable components used across the portfolio.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Design System</h1>
      <p className="text-xl text-muted-foreground mb-8">Component library for listerineh.dev</p>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-foreground/80 leading-relaxed mb-6">
          Welcome to the design system documentation. This Storybook showcases all the reusable components used across the portfolio, with interactive examples and documentation.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          This design system provides a consistent set of UI components built with:
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/80">
          <li><strong>React</strong> - Component library</li>
          <li><strong>Tailwind CSS</strong> - Styling</li>
          <li><strong>Radix UI</strong> - Accessible primitives</li>
          <li><strong>Lucide React</strong> - Icon library</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">Color Accents</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The design system uses accent colors to create visual hierarchy and brand identity:
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/80">
          <li><strong>Amber</strong> - Primary accent for blog and featured content</li>
          <li><strong>Indigo</strong> - Secondary accent for projects and portfolio</li>
          <li><strong>Green</strong> - Success states and positive feedback</li>
          <li><strong>Neutral</strong> - UI elements and secondary content</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">Component Categories</h2>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">Common Components</h3>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Reusable UI components used throughout the application:
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/80">
          <li>Buttons, Pills, Cards</li>
          <li>Typography (Title, Text, SectionLabel)</li>
          <li>Forms (Input, Dropdown)</li>
          <li>Icons and brand elements</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">Blog Components</h3>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Specialized components for blog functionality:
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/80">
          <li>Content rendering (CodeBlockCopyButton, TableOfContents)</li>
          <li>Engagement (BlogReactions, ShareButtons, BlogViews)</li>
          <li>Navigation (BlogSearch)</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">Usage</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          All components are imported from <code className="bg-muted px-2 py-1 rounded">@/components/ds</code>:
        </p>
        <pre className="bg-muted p-4 rounded-lg mb-6 overflow-x-auto">
          <code>{`import { Button, Title, AccentCard } from '@/components/ds';`}</code>
        </pre>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">Theme Support</h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          All components support light and dark themes. Use the theme switcher in the toolbar to preview components in both modes.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
        <p className="text-foreground/80 leading-relaxed">
          Browse the component categories in the sidebar to explore available components. Each component includes interactive examples and usage guidelines.
        </p>
      </div>
    </div>
  ),
};
