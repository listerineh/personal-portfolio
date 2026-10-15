"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton, LanguageSwitcher } from "@/components/common";
import { Mark, useRoute } from "@/components/ds";
import { cn } from "@/lib/utils";

/**
 * The gallery's top strip. Solid ground (no glass), the mark, the rooms of the site,
 * and the room you are standing in, as text.
 */
export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const { current } = useRoute();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  const navItems = useMemo(
    () => [
      { label: t("about"), href: "/about" },
      { label: t("experience"), href: "/experience" },
      { label: t("skills"), href: "/skills" },
      { label: t("projects"), href: "/projects" },
      { label: t("blog"), href: "/blog" },
      { label: t("contact"), href: "/contact" },
      { label: t("why"), href: "/why" },
    ],
    [t],
  );

  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const lockScroll = () => {
    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
  };

  const openRef = useRef(false);

  const closeMenu = useCallback((restoreFocus = true) => {
    if (!openRef.current) return;
    openRef.current = false;
    unlockScroll();
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const openMenu = () => {
    openRef.current = true;
    lockScroll();
    setOpen(true);
  };

  // Escape closes; focus moves into the sheet and stays there while it is open.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    sheet?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !sheet) return;
      const focusable = Array.from(
        sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  // Close the sheet if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => query.matches && closeMenu(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open, closeMenu]);

  const handleHashLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("/#")) {
      closeMenu(false);
      return;
    }
    event.preventDefault();
    const section =
      pathname === "/" ? document.getElementById(href.slice(2)) : null;
    closeMenu(false);
    if (section) {
      window.requestAnimationFrame(() =>
        section.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } else {
      router.push(href);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/15 bg-background print:static">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-gutter md:h-16">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            onClick={() => closeMenu(false)}
            className="flex shrink-0 items-center gap-3"
            aria-label="Sebastian Alvarez"
          >
            <Mark className="h-8 w-8" />
            <span className="hidden font-sans text-[0.9375rem] font-extrabold uppercase tracking-[0.02em] [font-stretch:125%] sm:inline">
              Listerineh
            </span>
          </Link>
          {current && (
            <p className="text-catalog hidden min-w-0 truncate border-l border-foreground/20 pl-4 text-muted-foreground md:block">
              <span className="text-foreground">{current.number}</span>{" "}
              {current.name}
            </p>
          )}
        </div>

        <nav className="hidden lg:block" aria-label={tCommon("menu")}>
          <ul className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(event) => handleHashLink(event, item.href)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-11 items-center text-[0.9375rem] font-semibold transition-colors duration-snap ease-snap",
                    isCurrent(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isCurrent(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-2 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggleButton />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={open ? () => closeMenu() : openMenu}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? tCommon("close") : tCommon("menu")}
            className="inline-flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet: a painted wall with the rooms of the site as wall titles. */}
      <div
        id="site-menu"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={tCommon("menu")}
        className={cn(
          "wall fixed inset-x-0 bottom-0 top-14 flex-col overflow-y-auto md:top-16 lg:hidden",
          open ? "flex" : "hidden",
        )}
      >
        <nav className="flex-1 px-gutter pt-6" aria-label={tCommon("menu")}>
          <ol className="divide-y divide-foreground/20 border-y border-foreground/20">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(event) => handleHashLink(event, item.href)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="flex min-h-16 items-baseline gap-4 py-3"
                >
                  <span className="text-catalog w-6 shrink-0 text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(1.75rem,8vw,2.5rem)] font-extrabold leading-none tracking-[-0.02em] [font-stretch:118%]">
                    {item.label}
                  </span>
                  {isCurrent(item.href) && (
                    <span
                      aria-hidden="true"
                      className="ml-auto h-3 w-3 shrink-0 self-center bg-primary"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-center justify-between px-gutter py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <LanguageSwitcher />
          <p className="text-catalog text-muted-foreground">
            © {new Date().getFullYear()} Sebastian Alvarez
          </p>
        </div>
      </div>
    </header>
  );
}
