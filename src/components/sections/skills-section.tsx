'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { skills } from '@/lib/data';
import { shuffleArray } from '@/lib/utils';
import { SectionWrapper } from '@/components/common/section-wrapper';
import 'swiper/css';


export function SkillsSection() {
  const shuffledArray = shuffleArray([...skills]);

  return (
    <SectionWrapper title="Technologies I Work With" id='skills' className="bg-secondary/85" isInfinite>   
        <div className="relative group">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={5000}
            freeMode={true}
            allowTouchMove={false}
            className="w-full"
          >
            {shuffledArray.map((skill, index) => (
              <SwiperSlide key={`skill-${index}`} className="!w-auto">
                <div 
                  className="min-w-[65px] sm:min-w-[90px] md:min-w-[100px] flex flex-col items-center justify-center p-4 mx-2 sm:mx-3 md:mx-4 transition-transform duration-300 hover:scale-110"
                  title={skill.name}
                >
                  {skill.iconUrl && (
                    <img
                      className="h-10 w-10 sm:h-16 sm:w-16 md:h-18 md:w-18 text-accent mb-1 aspect-square object-contain"
                      src={skill.iconUrl}
                      alt={skill.name}
                    />
                  )}
                  <p className="text-xs sm:text-sm font-medium text-center text-foreground/80 transition-colors truncate max-w-[80px] sm:max-w-[100px]">
                    {skill.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="text-center text-muted-foreground mt-10 md:mt-12 text-sm md:text-base px-4">
            Proficient with a diverse range of modern development tools and frameworks, always keen to explore emerging technologies.
          </p>
        </div>
    </SectionWrapper>
  );
}

