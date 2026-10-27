"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, RotateCw } from "lucide-react";
import { Ambient, Button, Mark } from "@/components/ds";

/**
 * Something broke inside a page. Rendered without the site header and footer on purpose (they may be what failed),
 * but in the same world as the 404: ambient light, the mark home, one clear retry, a few safe pages.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  const tNav = useTranslations("notFound");

  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  const pages = [
    { href: "/projects", key: "projects" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
  ] as const;

  return (
    <main
      id="main-content"
      className="relative isolate flex min-h-[100svh] flex-col overflow-clip bg-background px-gutter"
    >
      <Ambient />
      <div className="mx-auto flex h-header w-full max-w-[1200px] items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          aria-label="listerineh.dev"
        >
          <Mark className="h-7 w-7" />
          <span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
            listerineh.dev
          </span>
        </Link>
      </div>

      <div className="mx-auto my-auto grid w-full max-w-[1200px] gap-12 py-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
            <RotateCw aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="text-meta mt-8 text-muted-foreground">
            {t("errorCode")}
          </p>
          <h1 className="text-display-sm mt-2 max-w-[18ch]">{t("title")}</h1>
          <p className="text-lead mt-5 max-w-[46ch] text-muted-foreground">
            {t("description")}
          </p>
          {process.env.NODE_ENV === "development" && (
            <pre className="panel mt-8 max-w-2xl overflow-x-auto rounded-lg p-4 font-mono text-xs">
              {error.message}
            </pre>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              accent="amber"
              size="lg"
              onClick={reset}
              className="w-full sm:w-auto"
            >
              <RotateCw aria-hidden="true" className="h-4 w-4" />
              {t("tryAgain")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/"
              className="w-full sm:w-auto"
            >
              <Home aria-hidden="true" className="h-4 w-4" />
              {t("goHome")}
            </Button>
          </div>
        </div>

        <nav
          aria-labelledby="error-pages"
          className="lg:col-span-4 lg:col-start-9 lg:self-end"
        >
          <h2 id="error-pages" className="text-headline">
            {tNav("interestedIn")}
          </h2>
          <ul className="panel mt-4 grid gap-0.5 p-2">
            {pages.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex min-h-12 items-center rounded-[14px] px-4 text-base font-medium transition-colors duration-snap ease-snap hover:bg-foreground/[0.05] hover:text-primary"
                >
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
