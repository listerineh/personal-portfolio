import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-text-light py-8 text-center">
      <div className="container mx-auto px-6">
        <p className="text-sm text-text-light opacity-75">
          © {currentYear} Sebastian Alvarez. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
