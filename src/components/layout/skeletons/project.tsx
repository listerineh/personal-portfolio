"use client";

import { ProjectDetailClientPage } from "@/components/projects/project-detail-client-page";
import { PageLoading } from "../page-loading";
import { placeholderProject } from "./placeholders";

export function ProjectSkeleton() {
  const project = placeholderProject(0);
  return (
    <PageLoading shell={false}>
      <ProjectDetailClientPage versions={{ en: { project }, es: { project } }} initialLocale="en" />
    </PageLoading>
  );
}
