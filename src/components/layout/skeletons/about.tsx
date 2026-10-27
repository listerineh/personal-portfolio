"use client";

import { AboutContent } from "@/components/sections/about-content";
import { PageLoading } from "../page-loading";

export function AboutSkeleton() {
  return (
    <PageLoading>
      <AboutContent />
    </PageLoading>
  );
}
