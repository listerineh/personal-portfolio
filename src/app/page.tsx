"use client";

import { useTranslations } from "next-intl";
import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  BlogPreviewSection,
  ContactSection,
} from "@/components/sections";
import { SkipLink } from "@/components/ds";
import { useHashScroll } from "@/hooks/use-hash-scroll";

/** The exhibition: entrance, then the rooms in route order. */
export default function HomePage() {
  const t = useTranslations("common");

  useHashScroll();

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink>{t("skipToContent")}</SkipLink>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        <HeroSection />
        <ProjectsSection />
        <BlogPreviewSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
