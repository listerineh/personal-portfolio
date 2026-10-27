"use client";

import { SkillsListingClient } from "@/components/skills/skills-listing-client";
import { PageLoading } from "../page-loading";
import { placeholderSkillGroups } from "./placeholders";

export function SkillsSkeleton() {
  return (
    <PageLoading shell={false}>
      <SkillsListingClient skillGroups={placeholderSkillGroups} />
    </PageLoading>
  );
}
