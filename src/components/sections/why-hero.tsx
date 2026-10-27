import Image from "next/image";
import { useTranslations } from "next-intl";
import { Equalizer } from "@/components/ds";

/** /why's first screen: the photo fills the stage, a spotlight sweeps, the equalizer keeps time. Also the page's
 * loading skeleton (src/components/layout/skeletons), so both share one layout. */
export function WhyHero() {
  const t = useTranslations("why");

  return (
    <section
      aria-labelledby="why-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-clip px-gutter pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24"
    >
      <Image
        src="/images/sebas-playing.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[60%_30%] opacity-90 dark:opacity-70"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-t from-background via-background/85 to-background/45 dark:via-background/75 dark:to-background/20"
      />
      {/* Frosted glass that thickens toward the text, so the photo stays a mood rather than competing with the title. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-20 backdrop-blur-[10px] [-webkit-mask-image:linear-gradient(to_top,#000_35%,transparent_85%)] [mask-image:linear-gradient(to_top,#000_35%,transparent_85%)] dark:backdrop-blur-[4px]"
      />
      <span
        aria-hidden="true"
        className="stage-light pointer-events-none absolute -top-[30%] left-1/2 -z-10 h-[130%] w-[60vmax] -translate-x-1/2 opacity-50 mix-blend-multiply dark:opacity-60 dark:mix-blend-screen"
        style={{ background: 'radial-gradient(ellipse 35% 70% at 50% 0%, rgba(217,119,6,0.55), transparent 70%)' }}
      />
      <div className="mx-auto w-full max-w-[1200px]">
        <p
          data-intro=""
          style={{ '--i': 0 } as React.CSSProperties}
          className="material inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium text-foreground"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
          {t("heroEyebrow")}
        </p>
        <h1 id="why-title" className="mt-8">
          <span data-intro="" style={{ '--i': 1 } as React.CSSProperties} className="text-display block">
            {t("heroWhy")}
          </span>
          <span data-intro="" style={{ '--i': 2 } as React.CSSProperties} className="text-display block text-primary">
            Listerineh?
          </span>
        </h1>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p data-intro="" style={{ '--i': 3 } as React.CSSProperties} className="text-lead max-w-[48ch] text-foreground/80">
            {t("heroSubtitle")}
          </p>
          <Equalizer className="h-12 md:h-16" bars={14} />
        </div>
      </div>
    </section>
  );
}
