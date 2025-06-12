import Link from 'next/link';
import { socialLinks } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/75 text-secondary-foreground py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-secondary-foreground hover:text-primary transition-colors">
              <link.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Sebastian Alvarez. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
