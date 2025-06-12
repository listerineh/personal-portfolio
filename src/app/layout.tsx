import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/context/theme-context';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import AnimatedBackground from '@/components/common/animated-background';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Sebastian Alvarez | Software Engineer',
  description: 'Portfolio of Sebastian Alvarez, showcasing experience, skills, projects, and blog.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fontInter.variable, fontSpaceGrotesk.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <AnimatedBackground />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
