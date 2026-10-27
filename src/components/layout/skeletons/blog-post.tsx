"use client";

import { useTranslations } from "next-intl";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/ds";
import { BlogPostHeader } from "@/components/blog/blog-post-header";
import { PageLoading } from "../page-loading";
import { filler, placeholderPost } from "./placeholders";

/** The article's header, cover and opening paragraphs (the real header counts views, so it runs without them). */
export function BlogPostSkeleton() {
  const t = useTranslations("blog");
  const post = placeholderPost(0);
  return (
    <PageLoading>
      <PageHeader
        title={post.title}
        titleSize="section"
        intro={post.excerpt}
        nav={
          <span className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground/[0.06] pl-2.5 pr-4 text-[0.8125rem] font-medium text-foreground">
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            {t("backToBlog")}
          </span>
        }
      >
        <BlogPostHeader
          post={post}
          locale="en"
          formatDate={() => "January 1, 2026"}
          views={false}
        />
      </PageHeader>
      <div className="px-gutter">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 aspect-[3/2] overflow-hidden rounded-xl bg-muted shadow-card md:mb-16" />
        </div>
      </div>
      <div className="px-gutter pb-20 pt-4 md:pb-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="panel p-2 lg:hidden">
              <span className="flex min-h-11 items-center justify-between rounded-[14px] px-3 text-sm font-semibold">
                {t("tableOfContents")}
                <ChevronDown aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>
            <ul className="hidden gap-2 text-sm lg:grid">
              {[34, 22, 28, 18, 30].map((length, index) => (
                <li key={index} className="py-1">
                  {filler(length, index)}
                </li>
              ))}
            </ul>
          </aside>
          <article className="min-w-0 lg:col-span-8 lg:col-start-5">
            <div className="prose prose-article">
              <h2>{filler(28, 4)}</h2>
              <p>{filler(420, 1)}</p>
              <p>{filler(360, 6)}</p>
              <p>{filler(300, 11)}</p>
            </div>
          </article>
        </div>
      </div>
    </PageLoading>
  );
}
