import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from '../Projects'; // Path: sebastian-alvarez-portfolio/src/components/sections/Projects.tsx

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

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { layout, objectFit, ...rest } = props; // remove layout and objectFit as they are not standard img attributes
    return <img {...rest} />;
  },
}));


describe('Projects Section', () => {
  it('renders the section heading', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: /Projects/i, level: 2 })).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<Projects />);
    // Check for a project title
    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    // Check for "Live Demo" buttons (there should be multiple)
    expect(screen.getAllByText('Live Demo').length).toBeGreaterThanOrEqual(1);
  });
});
