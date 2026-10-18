"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/data/navigation";
import { CookieSettingsLink } from "@/components/common/cookie-settings-link";
import { Mark } from "@/components/ds";

/**
 * Quiet close on the tint ground: who I am in one line, then links grouped under headings
 * (work, about me, connect), then the small print.
 */
export function Footer() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const groups = [
    {
      title: tFooter("groupWork"),
      links: [
        { label: t("projects"), href: "/projects" },
        { label: t("experience"), href: "/experience" },
        { label: t("skills"), href: "/skills" },
        { label: t("blog"), href: "/blog" },
      ],
    },
    {
      title: tFooter("groupAbout"),
      links: [
        { label: t("about"), href: "/about" },
        { label: t("whyListerineh"), href: "/why" },
        { label: t("contact"), href: "/contact" },
      ],
    },
  ];

  const linkClass =
    "inline-flex min-h-10 items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors duration-snap ease-snap hover:text-foreground motion-reduce:transition-none";
  const smallLink =
    "inline-flex min-h-10 items-center text-[0.8125rem] text-muted-foreground transition-colors duration-snap ease-snap hover:text-foreground motion-reduce:transition-none";

  return (
    <footer className="tint relative pb-[calc(env(safe-area-inset-bottom)+0.25rem)] print:hidden">
      <div className="mx-auto max-w-[1200px] px-gutter pb-10 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Sebastian Alvarez">
              <Mark className="h-9 w-9" />
              <span className="text-xl font-semibold tracking-[-0.02em]">Listerineh</span>
            </Link>
            <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              {tFooter("tagline")}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-9 items-center gap-2 rounded-full bg-foreground/[0.06] pl-3 pr-4 text-[0.8125rem] font-medium text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.1]"
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {tFooter("available")}
            </Link>
          </div>

          <nav aria-label={tCommon("siteIndex")} className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.8125rem] font-semibold text-foreground">{group.title}</h2>
                <ul className="mt-4 grid gap-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-[0.8125rem] font-semibold text-foreground">{tFooter("groupConnect")}</h2>
              <ul className="mt-4 grid gap-1">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tCommon("visitSocial")} ${link.name}`}
                      className={linkClass}
                    >
                      <link.icon aria-hidden="true" className="h-4 w-4" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t pt-6 md:mt-24 md:flex-row md:items-center md:justify-between">
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
