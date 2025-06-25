'use client';

import { SectionWrapper } from '@/components/common/section-wrapper';
import { experiences } from '@/lib/data';
import Image from "next/legacy/image";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <SectionWrapper id="experience" title="Work Experience">
      <div className="relative max-w-3xl mx-auto py-4">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-px" aria-hidden="true"></div>

        <div className="space-y-12">
          {displayedExperiences.map((exp, index) => (
            <div key={index} className="relative flex items-start gap-x-5 md:gap-x-8">
              
              <div className="flex-shrink-0 w-10 flex justify-center relative">
                <div className="h-12 flex items-center" aria-hidden="true">
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      alt={`${exp.company} logo`}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-background ring-4 ring-primary/20 z-10"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted border border-border text-muted-foreground">
                        <Briefcase className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-grow pt-px">
                <div className="flex items-start gap-x-4 md:gap-x-6">
                  <div className="flex-grow">
                    <h3 className="text-xl font-headline font-semibold text-primary mb-0.5">{exp.jobTitle}</h3>
                    <p className="text-md font-medium text-foreground">{exp.company}</p>
                    <div className="text-sm text-muted-foreground mt-1 mb-1.5 md:mb-3">
                      <span>{exp.employmentDates}</span>
                      {exp.location && (
                        <>
                          <span className="mx-1.5">·</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                      {exp.responsibilities
                        .slice(0, expandedItems[index] ? exp.responsibilities.length : 3)
                        .map((responsibility, i) => (
                          <li key={i}>{responsibility}</li>
                      ))}
                      {exp.responsibilities.length > 3 && (
                        <Button 
                          variant="link"
                          onClick={() => toggleExpand(index)}
                          className="text-accent hover:underline text-xs -p-4 my-0"
                        >
                          {expandedItems[index] ? 'Show less' : 'See more...'}
                        </Button>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {experiences.length > 3 && !showAll && (
        <div className='flex justify-end w-full'>
          <Button 
            variant="outline"
            onClick={() => setShowAll(true)}
            className="text-right hover:text-white"
          >
            Show all experience
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
