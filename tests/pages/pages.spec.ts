import { test, expect } from "@playwright/test";
import { open, type Locale } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

// Every route renders in both languages with its own heading and title.
const pages: {
  path: string;
  h1: Record<Locale, RegExp>;
  title: Record<Locale, RegExp>;
}[] = [
  {
    path: "/about",
    h1: { en: /Sebastian/, es: /Sebastian/ },
    title: { en: /^About ·/, es: /^Sobre mí ·/ },
  },
  {
    path: "/projects",
    h1: { en: /Selected Work/, es: /Trabajos Seleccionados/ },
    title: { en: /^Projects ·/, es: /^Proyectos ·/ },
  },
  {
    path: "/projects/openstage",
    h1: { en: /OpenStage/, es: /OpenStage/ },
    title: { en: /^OpenStage ·/, es: /^OpenStage ·/ },
  },
  {
    path: "/skills",
    h1: { en: /Tech Stack/, es: /Stack Tecnológico/ },
    title: { en: /^Skills ·/, es: /^Habilidades ·/ },
  },
  {
    path: "/blog",
    h1: { en: /Blog/, es: /Blog/ },
    title: { en: /^Blog ·/, es: /^Blog ·/ },
  },
  {
    path: "/contact",
    h1: { en: /Let's talk/, es: /Hablemos/ },
    title: { en: /^Contact ·/, es: /^Contacto ·/ },
  },
  {
    path: "/why",
    h1: { en: /Why\s*Listerineh\?/, es: /¿Por qué\s*Listerineh\?/ },
    title: { en: /^Why Listerineh\? ·/, es: /^¿Por qué Listerineh\? ·/ },
  },
  {
    path: "/privacy",
    h1: { en: /Privacy Policy/, es: /Política de Privacidad/ },
    title: { en: /^Privacy Policy ·/, es: /^Política de privacidad ·/ },
  },
  {
    path: "/terms",
    h1: { en: /Terms of Use/, es: /Términos de Uso/ },
    title: { en: /^Terms of Use ·/, es: /^Términos de uso ·/ },
  },
  {
    path: "/unsubscribe",
    h1: { en: /Unsubscribe/, es: /Cancelar Suscripción/ },
    title: { en: /^Unsubscribe ·/, es: /^Darse de baja ·/ },
  },
];

for (const locale of ["en", "es"] as const) {
  test.describe(`Pages (${locale})`, () => {
    for (const { path, h1, title } of pages) {
      test(`${path} renders`, async ({ page }) => {
        const response = await open(page, path, locale, "domcontentloaded");
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(
          h1[locale],
        );
        await expect(page).toHaveTitle(title[locale]);
        await expect(page.locator("main#main-content")).toBeVisible();
      });
    }

    test("an unknown route answers 404 with a way back", async ({ page }) => {
      const response = await open(
        page,
        "/this-page-does-not-exist",
        locale,
        "domcontentloaded",
      );
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        locale === "es" ? /Página No Encontrada/ : /Page Not Found/,
      );
      await expect(page.locator('a[href="/"]').first()).toBeVisible();
    });
  });
}

test("the newsletter unsubscribe page is kept out of search results", async ({
  page,
}) => {
  await open(page, "/unsubscribe", "en", "domcontentloaded");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});
