import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-headline font-bold text-primary/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-24 w-24 md:h-32 md:w-32 text-primary/30" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="outline" size="lg">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4">
            You might be interested in:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/blog" className="text-sm text-accent hover:text-primary hover:underline">
              Blog
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/#projects" className="text-sm text-accent hover:text-primary hover:underline">
              Projects
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/#experience" className="text-sm text-accent hover:text-primary hover:underline">
              Experience
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/#contact" className="text-sm text-accent hover:text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
