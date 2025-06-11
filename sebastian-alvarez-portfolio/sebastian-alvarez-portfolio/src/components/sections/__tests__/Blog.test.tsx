import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from '../Blog'; // Path: sebastian-alvarez-portfolio/src/components/sections/Blog.tsx

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: jest.fn(({ children, ...props }) => {
        const { initial, whileInView, viewport, transition, whileHover, ...rest } = props;
        return <div {...rest}>{children}</div>;
      }),
    },
  };
});

describe('Blog Section', () => {
  it('renders the section heading', () => {
    render(<Blog />);
    expect(screen.getByRole('heading', { name: /Latest Blog Posts/i, level: 2 })).toBeInTheDocument();
  });

  it('renders blog post snippets', () => {
    render(<Blog />);
    // Check for a blog post title
    expect(screen.getByText('Understanding React Hooks')).toBeInTheDocument();
    // Check for "Read More" links
    expect(screen.getAllByText(/Read More/i).length).toBeGreaterThanOrEqual(1);
  });
});
