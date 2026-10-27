"use client";

import { WhyHero } from "@/components/sections/why-hero";
import { PageLoading } from "../page-loading";

/** The first screen only: the rest of /why loads Spotify and sits far below the fold. */
export function WhySkeleton() {
  return (
    <PageLoading>
      <WhyHero />
    </PageLoading>
  );
}
