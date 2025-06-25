import { Header, Footer } from '@/components/layout';
import { 
  HeroSection, 
  ExperienceSection, 
  SkillsSection, 
  ProjectsSection, 
  BlogPreviewSection, 
  ContactSection 
} from '@/components/sections';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
