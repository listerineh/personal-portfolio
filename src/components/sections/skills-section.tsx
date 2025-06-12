
import { SectionWrapper } from '@/components/common/section-wrapper';
import { skills } from '@/lib/data';
import { shuffleArray } from '@/lib/utils';


export function SkillsSection() {
  const duplicatedSkills = shuffleArray([...skills]);

  return (
    <SectionWrapper id="skills" title="Technologies I Work With" className="bg-secondary/85" isInfinite>
      <div className="relative w-full overflow-hidden py-4 md:py-8 rounded-lg group">
        <div className="w-full flex whitespace-nowrap animate-marquee group-hover:pause-animation">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={`skill-${index}`} 
              className="min-w-[65px] sm:min-w-[85px] md:min-w-[100px] inline-flex flex-col items-center justify-center p-4 mx-2 sm:mx-3 md:mx-4 transition-transform duration-300 hover:scale-110"
              title={skill.name}
            >
              {skill.iconUrl && (
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-accent mb-1 aspect-square object-contain"
                  src={skill.iconUrl}
                  alt={skill.name}
                />
              )}
              <p className="text-xs sm:text-sm font-medium text-center text-foreground/80 transition-colors truncate max-w-[80px] sm:max-w-[100px]">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-muted-foreground mt-10 md:mt-12 text-sm md:text-base">
        Proficient with a diverse range of modern development tools and frameworks, always keen to explore emerging technologies.
      </p>
    </SectionWrapper>
  );
}

