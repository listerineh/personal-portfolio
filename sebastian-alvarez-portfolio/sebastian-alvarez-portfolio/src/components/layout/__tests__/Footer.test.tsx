import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer'; // Path: sebastian-alvarez-portfolio/src/components/layout/Footer.tsx

describe('Footer', () => {
  it('renders the copyright notice with the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    // Using a regex to match the text content flexibly
    expect(screen.getByText(`© ${currentYear} Sebastian Alvarez. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders copyright text with correct class for styling', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/Sebastian Alvarez. All rights reserved./i);
    expect(copyrightText).toHaveClass('text-sm text-text-light opacity-75'); // Check for theme color classes
  });
});
