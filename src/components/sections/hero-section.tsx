"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { hero } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function HeroSection() {
  const { toast } = useToast();

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-b from-secondary via-secondary/90 to-secondary/0 py-20 pt-28 md:pt-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-primary animate-fade-in">
          <Image
            src={hero.href}
            alt={hero.title}
            width={200}
            height={200}
            className="rounded-xl object-cover border-4 border-accent shadow-lg hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground mb-4 animate-fade-in animation-delay-200">
          {hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-primary font-medium mb-8 animate-fade-in animation-delay-400">
          {hero.subtitle}
        </p>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12 text-base md:text-lg animate-fade-in animation-delay-500">
          {hero.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in animation-delay-700">
          <Button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/docs/CV_SebastianAlvarez_FS_EN.pdf';
              link.download = 'CV_SebastianAlvarez_EN.pdf';
              link.click();
              toast({
                title: "CV Downloaded!",
                description: "Thank you for downloading my CV. I hope you find it useful.",
              });
            }}
            size="lg" 
            variant="ghost" 
            className="text-accent hover:bg-accent/10 hover:text-accent w-full sm:w-auto"
          >
            Download CV <FileText className="ml-2 h-5 w-5" />
          </Button>
          <Link href="#contact">
             <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
             Get in Touch <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
