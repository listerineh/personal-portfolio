"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "@/context/locale-context";
import { PageShell } from "@/components/layout";
import { Button, FormField, Input, PageHeader } from "@/components/ds";
import { CheckCircle, Mail, XCircle } from "lucide-react";

type Status = "idle" | "loading" | "unsubscribed" | "link-sent" | "error";

/**
 * Arriving from a newsletter email (signed link): one confirm button, so link scanners that open URLs never
 * unsubscribe anyone. Arriving without a link: ask for the address and email it a signed link.
 */
function UnsubscribeFlow() {
  const t = useTranslations("unsubscribe");
  const { locale } = useLocale();
  const params = useSearchParams();
  const linkEmail = params.get("email") ?? "";
  const linkToken = params.get("token") ?? "";
  const [hasLink, setHasLink] = useState(Boolean(linkEmail && linkToken));
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const send = async (payload: Record<string, string>) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatus(data.message === "link-sent" ? "link-sent" : "unsubscribed");
      } else if (data.error === "invalid-link") {
        // Expired or altered link: fall back to asking for the address.
        setHasLink(false);
        setStatus("idle");
        setMessage(t("invalidLink"));
      } else {
        setStatus("error");
        setMessage(response.status === 429 ? t("tooMany") : t("errorMessage"));
      }
    } catch {
      setStatus("error");
      setMessage(t("errorMessage"));
    }
  };

  return (
    <div className="panel max-w-xl p-6 md:p-8" aria-live="polite">
      {(status === "idle" || status === "loading") && hasLink && (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-headline break-words">
              {t("confirmFor", { email: linkEmail })}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              {t("confirmIntro")}
            </p>
          </div>
          <Button
            accent="amber"
            size="lg"
            disabled={status === "loading"}
            onClick={() => send({ email: linkEmail, token: linkToken })}
            className="w-full sm:w-auto sm:justify-self-start"
          >
            {status === "loading" ? t("unsubscribing") : t("unsubscribeButton")}
          </Button>
        </div>
      )}

      {(status === "idle" || status === "loading") && !hasLink && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send({ email });
          }}
          className="grid gap-6"
        >
          {message && (
            <p
              role="alert"
              className="text-[0.9375rem] leading-relaxed text-foreground"
            >
              {message}
            </p>
          )}
          <FormField label={t("emailLabel")} required>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="your@email.com"
            />
          </FormField>
          <Button
            type="submit"
            accent="amber"
            size="lg"
            disabled={status === "loading"}
            className="w-full sm:w-auto sm:justify-self-start"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            {status === "loading" ? t("sending") : t("sendLink")}
          </Button>
        </form>
      )}

      {(status === "unsubscribed" || status === "link-sent") && (
        <div role="status" className="grid gap-5">
          {status === "unsubscribed" ? (
            <CheckCircle aria-hidden="true" className="h-8 w-8 text-primary" />
          ) : (
            <Mail aria-hidden="true" className="h-8 w-8 text-primary" />
          )}
          <p className="text-lead">
            {status === "unsubscribed" ? t("successMessage") : t("linkSent")}
          </p>
          <div>
            <Button variant="secondary" href="/">
              {t("backToHome")}
            </Button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="grid gap-5">
          <XCircle aria-hidden="true" className="h-8 w-8 text-destructive" />
          <p className="text-lead font-medium text-destructive">{message}</p>
          <div>
            <Button accent="amber" onClick={() => setStatus("idle")}>
              {t("tryAgain")}
            </Button>
          </div>
        </div>
      )}
    </div>
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
            <UnsubscribeFlow />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
