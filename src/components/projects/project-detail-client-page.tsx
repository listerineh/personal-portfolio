"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useLocale } from "@/context/locale-context";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/types";
import { stackLayers } from "@/lib/stack-layers";
import {
  Ambient,
  Button,
  PageHeader,
  Panel,
  Reveal,
  StackList,
} from "@/components/ds";
import { projectStatusDot, type ProjectStatus } from "@/components/ds/ProjectCard";
import { PageShell } from "@/components/layout";
import { cn } from "@/lib/utils";

export interface ProjectVersion {
  project?: Project;
  next?: Pick<Project, "slug" | "title" | "description" | "imageUrl">;
}

interface ProjectDetailClientPageProps {
  versions: Partial<Record<Locale, ProjectVersion>>;
  initialLocale: Locale;
}

function formatProjectDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(
    locale === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long" },
  );
}


/**
 * A single project, product-page style: title and actions, the product shot large, three quick facts,
 * the story at reading width with the stack beside it, then the next project.
 */
export function ProjectDetailClientPage({
  versions,
  initialLocale,
}: ProjectDetailClientPageProps) {
  const { locale } = useLocale();
  const t = useTranslations("project");
  const tSala = useTranslations("sala");
  const version = versions[locale as Locale] ?? versions[initialLocale];
  const project = version?.project;
  if (!project) return null;

  const status = project.status as ProjectStatus | undefined;
  const dateRange = project.startDate
    ? `${formatProjectDate(project.startDate, locale)}${project.endDate ? ` – ${formatProjectDate(project.endDate, locale)}` : ""}`
    : "";

  const backLink = (
    <Link
      href="/projects"
      className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground/[0.06] pl-2.5 pr-4 text-[0.8125rem] font-medium text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.1]"
    >
      <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      {t("allProjects")}
    </Link>
  );

  const facts = [
    project.role && { label: t("role"), value: <span>{project.role}</span> },
    dateRange && { label: t("timeline"), value: <span>{dateRange}</span> },
    status && {
      label: t("statusLabel"),
      value: (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn("h-2 w-2 rounded-full", projectStatusDot[status])}
          />
          {t(`status.${status}`)}
        </span>
      ),
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <PageShell>
      <PageHeader
        title={project.title}
        intro={project.description}
        nav={backLink}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.liveDemoUrl && (
            <Button
              accent="amber"
              size="lg"
              href={project.liveDemoUrl}
              external
              className="w-full sm:w-auto"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              {t("liveDemo")}
            </Button>
          )}
          {project.sourceCodeUrl && (
            <Button
              variant="secondary"
              size="lg"
              href={project.sourceCodeUrl}
              external
              className="w-full sm:w-auto"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              {t("sourceCode")}
            </Button>
          )}
        </div>
      </PageHeader>

      {/* The product shot, large, then the quick facts under it. */}
      <section className="px-gutter">
        <div className="mx-auto max-w-[1200px]">
          {project.imageUrl && (
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-card md:aspect-[16/10]">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}
          {facts.length > 0 && (
            <dl
              className={cn(
                "mt-5 grid gap-3 sm:gap-5",
                facts.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
              )}
            >
              {facts.map((fact) => (
                <div key={fact.label} className="panel p-5 md:p-6">
                  <dt className="text-meta text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-headline">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* Story at reading width; the stack and why it matters stay beside it on desktop. */}
      <section className="px-gutter py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {project.longDescription && (
              <>
                <h2 className="text-display-sm">{t("aboutProject")}</h2>
                <div className="mt-8 grid max-w-[66ch] gap-5 text-[1.0625rem] leading-[1.75] text-foreground/85">
                  {project.longDescription.split("\n\n").map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="grid content-start gap-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-5 lg:self-start">
            {project.tags.length > 0 && (
              <StackList
                caption={t("technologies")}
                layers={stackLayers(project.tags).map(({ layer, items }) => ({
                  name: tSala(`layers.${layer}`),
                  items,
                }))}
              />
            )}
            {project.relevance && (
              <Panel className="p-5 md:p-6">
                <h2 className="text-meta text-muted-foreground">
                  {t("relevance")}
                </h2>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">
                  {project.relevance}
                </p>
              </Panel>
            )}
          </aside>
        </div>
      </section>

      {/* Next project: the page continues instead of stopping. */}
      {version?.next && (
        <section
          aria-labelledby="next-project"
          className="relative isolate overflow-clip tint px-gutter py-20 md:py-28"
        >
          <Ambient intensity="soft" grid={false} spotlight={false} mirror />
          <div className="mx-auto max-w-[1200px]">
            <p id="next-project" className="text-meta text-muted-foreground">
              {t("nextProject")}
            </p>
            <Link
              href={`/projects/${version.next.slug}`}
              className="panel group mt-5 grid overflow-hidden no-underline transition-[transform,box-shadow] duration-glide ease-glide hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none md:grid-cols-2"
            >
              <span className="flex flex-col justify-center gap-3 p-6 md:p-10">
                <span className="text-display-sm transition-colors duration-snap ease-snap group-hover:text-primary">
                  {version.next.title}
                </span>
                <span className="line-clamp-3 max-w-[48ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {version.next.description}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-primary">
                  {t("nextProject")}
                  <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-snap ease-snap group-hover:translate-x-0.5"
                  />
                </span>
              </span>
              {version.next.imageUrl && (
                <span className="relative order-first aspect-[4/3] overflow-hidden bg-muted md:order-none md:aspect-auto md:min-h-[320px]">
                  <Image
                    src={version.next.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-transform duration-glide ease-glide group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </span>
              )}
            </Link>
          </div>
        </section>
      )}
    </PageShell>
  );
}
