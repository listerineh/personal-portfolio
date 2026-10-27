"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { PageLoading } from "../page-loading";

// Each route's loading state is built from the route's own components, so the skeleton has the page's exact shapes
// (see PageLoading and PageSkeleton). One file per route keeps each loading chunk to its own page.

export function HomeSkeleton() {
  return (
    <PageLoading>
      <HeroSection />
    </PageLoading>
  );
}
