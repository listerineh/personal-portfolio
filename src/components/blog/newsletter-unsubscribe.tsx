"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  XCircle,
} from "lucide-react";
import { Button, FormField, Input } from "@/components/ds";

type Status = "idle" | "loading" | "unsubscribed" | "link-sent" | "error";

interface NewsletterUnsubscribeProps {
  /** Address from a signed newsletter link (`/unsubscribe?email=…&token=…`). */
  email?: string;
  /** Signature from the same link. With both, the visitor only confirms; without, they ask for a link. */
  token?: string;
}

/**
 * Leaving the newsletter. From a newsletter email (signed link) it is one confirm button, so mail scanners that
 * open URLs never unsubscribe anyone. Without a link it asks for the address and emails it a signed link; the
 * answer is the same whether or not the address is on the list.
 */
export function NewsletterUnsubscribe({
  email: linkEmail = "",
  token: linkToken = "",
}: NewsletterUnsubscribeProps) {
  const t = useTranslations("unsubscribe");
  const locale = useLocale();
  const [hasLink, setHasLink] = useState(Boolean(linkEmail && linkToken));
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");

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
        setNotice(t("invalidLink"));
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
  const spinner = (
    <Loader2
      aria-hidden="true"
      className="h-4 w-4 animate-spin motion-reduce:animate-none"
    />
  );

  return (
    <div className="panel max-w-xl p-6 md:p-8" aria-live="polite">
      {(status === "idle" || loading) && hasLink && (
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
            disabled={loading}
            onClick={() => send({ email: linkEmail, token: linkToken })}
            className="w-full sm:w-auto sm:justify-self-start"
          >
            {loading && spinner}
            {loading ? t("unsubscribing") : t("unsubscribeButton")}
          </Button>
        </div>
      )}

      {(status === "idle" || loading) && !hasLink && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send({ email });
          }}
          className="grid gap-6"
        >
          {notice && (
            <p
              role="alert"
              className="flex items-start gap-2 text-[0.9375rem] leading-relaxed"
            >
              <AlertCircle
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              />
              <span>{notice}</span>
            </p>
          )}
          <FormField label={t("emailLabel")} required>
            <Input
              id="unsubscribe-email"
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
            disabled={loading}
            className="w-full sm:w-auto sm:justify-self-start"
          >
            {loading ? (
              spinner
            ) : (
              <Mail aria-hidden="true" className="h-4 w-4" />
            )}
            {loading ? t("sending") : t("sendLink")}
          </Button>
        </form>
      )}

      {(status === "unsubscribed" || status === "link-sent") && (
        <div role="status" className="grid gap-5">
          {status === "unsubscribed" ? (
            <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-primary" />
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
