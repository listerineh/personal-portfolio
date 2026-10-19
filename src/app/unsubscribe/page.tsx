"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout";
import { PageHeader } from "@/components/ds";
import { NewsletterUnsubscribe } from "@/components/blog/newsletter-unsubscribe";

/** Reads the signed link (if any) from the URL and hands it to the unsubscribe flow. */
function UnsubscribeFromLink() {
  const params = useSearchParams();
  return (
    <NewsletterUnsubscribe
      email={params.get("email") ?? undefined}
      token={params.get("token") ?? undefined}
    />
  );
}

export default function UnsubscribePage() {
  const t = useTranslations("unsubscribe");

  return (
    <PageShell>
      <PageHeader
        title={t("title")}
        titleSize="section"
        intro={t("description")}
      />
      <section className="px-gutter pb-24 pt-4 md:pb-32 md:pt-8">
        <div className="mx-auto max-w-[1200px]">
          <Suspense fallback={<div className="panel h-48 max-w-xl" />}>
            <UnsubscribeFromLink />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
