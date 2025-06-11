import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar'; // Path: sebastian-alvarez-portfolio/src/components/layout/Navbar.tsx

// Mock next/link
jest.mock('next/link', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children, href }: { children: React.ReactNode; href: string;[key: string]: any }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Navbar', () => {
  it('renders the site title/brand name', () => {
    render(<Navbar />);
    expect(screen.getByText('Sebastian Alvarez')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('initially hides mobile menu items on larger screens (desktop first approach)', () => {
    // This test is tricky because JSDOM doesn't do layout.
    // We check if the menu container has 'hidden' class, assuming Tailwind's md:flex takes over.
    // This relies on the specific Tailwind class "hidden" for mobile when menu is closed.
    render(<Navbar />);
    // Find the div that contains the links. It's the one after the brand and mobile button.
    // Its classes are `md:flex items-center ${isMenuOpen ? 'block' : 'hidden'}`
    // When isMenuOpen is false (default), it should have 'hidden'.
    // This test might be fragile due to relying on specific class names.
    const menuContainer = screen.getByText('Experience').closest('div.md\\:flex'); // Find parent that becomes flex on md
    expect(menuContainer).toHaveClass('hidden'); // Initially hidden on mobile simulated view
  });

  // Further tests could simulate clicks on the mobile menu button
  // and check for visibility changes, but that requires more setup for userEvent.
});
