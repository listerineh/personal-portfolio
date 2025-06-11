import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../Contact'; // Path: sebastian-alvarez-portfolio/src/components/sections/Contact.tsx

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      section: jest.fn(({ children, ...props }) => {
        // Remove framer-motion specific props
        const { initial, whileInView, viewport, transition, ...rest } = props;
        return <section {...rest}>{children}</section>;
      }),
      button: jest.fn(({ children, ...props }) => {
        const { whileHover, whileTap, ...rest } = props;
        return <button {...rest}>{children}</button>;
      }),
    },
  };
});

describe('Contact Section', () => {
  it('renders the section heading', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /Contact Me/i, level: 2 })).toBeInTheDocument();
  });

  it('renders form elements', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Contact />);
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
    expect(screen.getByText(/sebastian.alvarez@example.com/i)).toBeInTheDocument();
  });
});
