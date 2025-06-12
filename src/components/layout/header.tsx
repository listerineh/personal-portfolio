'use client';

import Link from 'next/link';
import { Menu, X, CodeXml, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { navItems } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/context/theme-context';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-accent transition-colors" onClick={closeMobileMenu}>
          <CodeXml className="w-8 h-8" />
          Sebastian Alvarez
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="text-foreground hover:text-primary hover:bg-transparent">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="text-foreground hover:text-primary hover:bg-transparent">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle mobile menu" className="text-foreground hover:text-primary hover:bg-transparent">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background shadow-lg py-4 animate-in fade-in-20 slide-in-from-top-5 duration-300">
          <nav className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary font-medium py-2 transition-colors w-full text-center"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
