import React from 'react';
import { render, screen } from '@testing-library/react';
import Experience from '../Experience'; // Path: sebastian-alvarez-portfolio/src/components/sections/Experience.tsx

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: jest.fn(({ children, ...props }) => {
        // Remove framer-motion specific props that wouldn't be valid on a real div
        const { initial, whileInView, viewport, transition, ...rest } = props;
        return <div {...rest}>{children}</div>;
      }),
      // Add section, p, h1, etc. if you use motion.section, motion.p, etc.
      // For this component, only motion.div is used for each experience item.
    },
  };
});


describe('Experience Section', () => {
  it('renders the section heading', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { name: /Experience/i, level: 2 })).toBeInTheDocument();
  });

  it('renders multiple experience entries', () => {
    render(<Experience />);
    // Example: Check for one of the job titles
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    // Check if there are multiple elements that would typically represent an entry.
    // This is a bit abstract, depends on consistent structure.
    // For instance, if each entry has a company name:
    expect(screen.getAllByText(/Tech Solutions Inc.|Innovatech Ltd.|Web Wizards Co./i).length).toBeGreaterThanOrEqual(3);
  });
});
