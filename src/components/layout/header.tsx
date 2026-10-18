"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ThemeToggleButton, LanguageSwitcher } from "@/components/common";
import { Mark } from "@/components/ds";
import { cn } from "@/lib/utils";

/**
 * Floating translucent bar: the mark, the pages of the site, language and theme.
 * The hairline appears only once content scrolls under it. On phones, a full-screen sheet.
 */
export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Scroll edge: show the hairline only when content is under the bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 print:static",
        "transition-[box-shadow,background-color] duration-snap ease-snap motion-reduce:transition-none",
        open ? "bg-background" : "material",
        scrolled && !open && "shadow-[0_1px_0_rgb(var(--border)/0.8)]",
      )}
    >
      <div className="mx-auto flex h-header max-w-[1200px] items-center justify-between gap-4 px-gutter">
        <Link
          href="/"
          onClick={() => closeMenu(false)}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Sebastian Alvarez"
        >
          <Mark className="h-7 w-7" />
          <span className="hidden text-[0.9375rem] font-semibold tracking-[-0.02em] sm:inline">
            Listerineh
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label={tCommon("menu")}>
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(event) => handleHashLink(event, item.href)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-9 items-center rounded-full px-3.5 text-[0.875rem] font-medium",
                    "transition-[color,background-color] duration-snap ease-snap motion-reduce:transition-none",
                    isCurrent(item.href)
                      ? "bg-foreground/[0.06] text-foreground"
                      : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggleButton />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={open ? () => closeMenu() : openMenu}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? tCommon("close") : tCommon("menu")}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
          >
            {/* Two strokes that fold into an X: the control explains its own state change. */}
            <span aria-hidden="true" className="relative block h-3 w-[18px]">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full rounded-full bg-current",
                  "transition-transform duration-snap ease-snap motion-reduce:transition-none",
                  open ? "top-[5px] rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full rounded-full bg-current",
                  "transition-transform duration-snap ease-snap motion-reduce:transition-none",
                  open ? "top-[5px] -rotate-45" : "top-[10px]",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Phone sheet: pages as large links that arrive one after another. */}
      <div
        id="site-menu"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={tCommon("menu")}
        className={cn(
          "fixed inset-x-0 bottom-0 top-header flex-col overflow-y-auto bg-background lg:hidden",
          open ? "flex" : "hidden",
        )}
      >
        <nav className="flex-1 px-gutter pt-4" aria-label={tCommon("menu")}>
          <ul>
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:fill-mode-both"
                style={{ animationDelay: `${index * 35}ms`, animationDuration: "380ms" }}
              >
                <Link
                  href={item.href}
                  onClick={(event) => handleHashLink(event, item.href)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center justify-between py-2 text-[1.75rem] font-semibold tracking-[-0.03em]",
                    isCurrent(item.href) ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  {item.label}
                  {isCurrent(item.href) && (
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-between px-gutter py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <LanguageSwitcher />
          <p className="text-meta text-muted-foreground">
            © {new Date().getFullYear()} Sebastian Alvarez
          </p>
        </div>
      </div>
    </header>
  );
}
