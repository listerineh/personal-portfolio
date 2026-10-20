"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ds";
import { NewsletterSubscribe } from "./newsletter-subscribe";

type Status = "idle" | "loading" | "subscribed" | "already" | "invalid" | "error";

interface NewsletterConfirmProps {
  /** From the signed link in the "confirm your subscription" email (`/newsletter/confirm?email=…&expires=…&token=…`). */
  email?: string;
  expires?: string;
  token?: string;
}

/**
 * Step two of the double opt-in. The link only shows a button: mail scanners open links to check them, so
 * confirming on page load would subscribe addresses nobody confirmed. An expired or altered link offers the form
 * again, which sends a fresh one.
 */
export function NewsletterConfirm({ email = "", expires = "", token = "" }: NewsletterConfirmProps) {
  const t = useTranslations("newsletterConfirm");
  const locale = useLocale();
  const complete = Boolean(email && expires && token);
  const [status, setStatus] = useState<Status>(complete ? "idle" : "invalid");
  const [notice, setNotice] = useState("");

  const confirm = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, expires, token, locale }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatus(data.message === "already-subscribed" ? "already" : "subscribed");
      } else if (data.error === "invalid-link") {
        setStatus("invalid");
      } else {
        setStatus("error");
        setNotice(response.status === 429 ? t("tooMany") : t("errorMessage"));
      }
    } catch {
      setStatus("error");
      setNotice(t("errorMessage"));
    }
  };

  const loading = status === "loading";

  return (
    <div className="panel max-w-xl p-6 md:p-8" aria-live="polite">
      {(status === "idle" || loading) && (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-headline break-words">{t("confirmFor", { email })}</p>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{t("confirmIntro")}</p>
          </div>
          <Button
            accent="amber"
            size="lg"
            disabled={loading}
            onClick={() => void confirm()}
            className="w-full sm:w-auto sm:justify-self-start"
          >
            {loading && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />}
            {loading ? t("confirming") : t("confirmButton")}
          </Button>
        </div>
      )}

      {(status === "subscribed" || status === "already") && (
        <div role="status" className="grid gap-5">
          <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-primary" />
          <div className="grid gap-2">
            <p className="text-headline">{status === "subscribed" ? t("subscribedTitle") : t("alreadyTitle")}</p>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              {status === "subscribed" ? t("subscribedMessage") : t("alreadyMessage")}
            </p>
          </div>
          <div>
            <Button variant="secondary" href="/blog">
              {t("readBlog")}
            </Button>
          </div>
        </div>
      )}

      {status === "invalid" && (
        <div className="grid gap-6">
          <p role="alert" className="flex items-start gap-2 text-[0.9375rem] leading-relaxed">
            <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{t("invalidLink")}</span>
          </p>
          <NewsletterSubscribe variant="compact" />
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="grid gap-5">
          <XCircle aria-hidden="true" className="h-8 w-8 text-destructive" />
          <p className="text-lead font-medium text-destructive">{notice}</p>
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
