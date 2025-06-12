import Link from 'next/link';
import { navItems, socialLinks } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/75 text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            {navItems.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            {socialLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={link.name} 
                className="text-secondary-foreground hover:text-primary transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm">
            &copy; {currentYear} Sebastian Alvarez. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
