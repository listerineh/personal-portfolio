"use client";

import { ProjectsListingClientPage } from "@/components/projects/projects-listing-client-page";
import { PageLoading } from "../page-loading";
import { placeholderProjects } from "./placeholders";

export function ProjectsSkeleton() {
  return (
    <PageLoading shell={false}>
      <ProjectsListingClientPage projects={placeholderProjects} />
    </PageLoading>
  );
}
