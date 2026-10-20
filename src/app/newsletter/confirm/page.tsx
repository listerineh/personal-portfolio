"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout";
import { PageHeader } from "@/components/ds";
import { NewsletterConfirm } from "@/components/blog/newsletter-confirm";

/** Reads the signed link from the URL and hands it to the confirmation. */
function ConfirmFromLink() {
  const params = useSearchParams();
  return (
    <NewsletterConfirm
      email={params.get("email") ?? undefined}
      expires={params.get("expires") ?? undefined}
      token={params.get("token") ?? undefined}
    />
  );
}

export default function NewsletterConfirmPage() {
  const t = useTranslations("newsletterConfirm");

  return (
    <PageShell>
      <PageHeader title={t("title")} titleSize="section" intro={t("description")} />
      <section className="px-gutter pb-24 pt-4 md:pb-32 md:pt-8">
        <div className="mx-auto max-w-[1200px]">
          <Suspense fallback={<div className="panel h-48 max-w-xl" />}>
            <ConfirmFromLink />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
