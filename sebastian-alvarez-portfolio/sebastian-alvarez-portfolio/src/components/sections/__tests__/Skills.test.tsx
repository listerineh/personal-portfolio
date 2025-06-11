import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '../Skills'; // Path: sebastian-alvarez-portfolio/src/components/sections/Skills.tsx

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: jest.fn(({ children, ...props }) => {
        const { initial, whileInView, viewport, transition, ...rest } = props;
        return <div {...rest}>{children}</div>;
      }),
    },
  };
});

describe('Skills Section', () => {
  it('renders the section heading', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: /Skills/i, level: 2 })).toBeInTheDocument();
  });

  it('renders skill categories and skills', () => {
    render(<Skills />);
    // Check for a category heading
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    // Check for a specific skill
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });
});
