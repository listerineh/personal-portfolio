"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/data/navigation";
import { CookieSettingsLink } from "@/components/common/cookie-settings-link";
import { Mark } from "@/components/ds";

/** Quiet close: the pages of the site, where to find me, and the small print, set small on the tint ground. */
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

  const smallLink =
    "inline-flex min-h-10 items-center text-[0.8125rem] text-muted-foreground transition-colors duration-snap ease-snap hover:text-foreground motion-reduce:transition-none";

  return (
    <footer className="tint relative pb-[calc(env(safe-area-inset-bottom)+0.25rem)] print:hidden">
      <div className="mx-auto max-w-[1200px] px-gutter pb-8 pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Sebastian Alvarez">
              <Mark className="h-8 w-8" />
              <span className="text-lg font-semibold tracking-[-0.02em]">Listerineh</span>
            </Link>
            <ul className="mt-6 flex gap-2" aria-label={tCommon("followMe")}>
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tCommon("visitSocial")} ${link.name}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground transition-[background-color,color,transform] duration-snap ease-snap hover:bg-primary hover:text-primary-foreground active:scale-95 motion-reduce:transition-none"
                  >
                    <link.icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={tCommon("siteIndex")} className="md:col-span-7">
            <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 md:justify-items-end">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-foreground/85 transition-colors duration-snap ease-snap hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.8125rem] text-muted-foreground">
            © {currentYear} Sebastian Alvarez · {tCommon("allRightsReserved")}
          </p>
          <ul className="flex flex-wrap gap-x-5" aria-label={tCommon("legal")}>
            <li>
              <CookieSettingsLink className={smallLink} />
            </li>
            <li>
              <Link href="/privacy" className={smallLink}>
                {t("privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={smallLink}>
                {t("termsOfUse")}
              </Link>
            </li>
            <li>
              <Link href="/docs/components" className={smallLink}>
                {t("components")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
