"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/data";
import { CookieSettingsLink } from "@/components/common/cookie-settings-link";
import { Mark } from "@/components/ds";

/** The exit wall: the rooms of the site as an index, where to find me, and the small print. */
export function Footer() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: t("about"), href: "/about" },
    { label: t("experience"), href: "/experience" },
    { label: t("skills"), href: "/skills" },
    { label: t("projects"), href: "/projects" },
    { label: t("blog"), href: "/blog" },
    { label: t("contact"), href: "/contact" },
    { label: t("why"), href: "/why" },
  ];

  const legalLinkClass =
    "inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-[0.3em] transition-colors hover:text-foreground hover:underline";

  return (
    <footer className="wall relative pb-[calc(env(safe-area-inset-bottom)+0.25rem)] print:hidden">
      <div className="mx-auto max-w-[1296px] px-gutter py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Sebastian Alvarez"
            >
              <Mark className="h-10 w-10" />
              <span className="text-[1.375rem] font-extrabold uppercase leading-none tracking-[0.01em] [font-stretch:125%]">
                Listerineh
              </span>
            </Link>
          </div>

          <nav
            aria-label={tCommon("siteIndex")}
            className="md:col-span-4"
          >
            <ol className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
              {navItems.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex min-h-11 items-baseline gap-3 py-1"
                  >
                    <span className="text-catalog w-6 shrink-0 text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold underline-offset-[0.3em] group-hover:underline">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="md:col-span-3">
            <p className="text-catalog text-muted-foreground">
              {tCommon("followMe")}
            </p>
            <ul
              className="mt-3 flex flex-wrap gap-1"
              aria-label={tCommon("followMe")}
            >
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tCommon("visitSocial")} ${link.name}`}
                    className="inline-flex h-11 w-11 items-center justify-center border border-foreground/30 transition-colors duration-snap ease-snap hover:border-foreground hover:bg-foreground hover:text-surface"
                  >
                    <link.icon aria-hidden="true" className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-foreground/25 pt-6 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p className="text-catalog text-muted-foreground">
            © {currentYear} Sebastian Alvarez · {tCommon("allRightsReserved")}
          </p>
          <ul className="flex flex-wrap gap-x-6" aria-label={tCommon("legal")}>
            <li>
              <CookieSettingsLink className={legalLinkClass} />
            </li>
            <li>
              <Link href="/privacy" className={legalLinkClass}>
                {t("privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={legalLinkClass}>
                {t("termsOfUse")}
              </Link>
            </li>
            <li>
              <Link href="/docs/components" className={legalLinkClass}>
                {t("components")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
