import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { BlogPreviewSection } from '@/components/sections/blog-preview-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        {/* <ProjectsSection />
        <BlogPreviewSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
