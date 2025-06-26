import Image from "next/image";
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';
import { SectionWrapper } from '@/components/common';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-48 md:h-56 hover:scale-105 transition-all">
              <Image
                src={project.imageUrl}
                alt={project.title}
                data-ai-hint={project.imageAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover"
                }} />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-headline">{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-start gap-3">
              {project.liveDemoUrl && (
                <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                  <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.sourceCodeUrl && (
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                  <Link href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Source Code
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
