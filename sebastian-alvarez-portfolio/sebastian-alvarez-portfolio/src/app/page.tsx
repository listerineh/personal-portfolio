import React from 'react';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Experience />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
