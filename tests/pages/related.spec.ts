import { test, expect, type Page } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

const keepReadingSlugs = async (page: Page) => {
  const hrefs = await page
    .getByRole("region", { name: /Keep reading|Sigue leyendo/ })
    .locator('a[href^="/blog/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
  return [...new Set(hrefs)].map((href) => href.replace("/blog/", ""));
};

test.describe("After an article", () => {
  test("keep reading suggests the most related posts", async ({ page }) => {
    await open(page, "/blog/terraform-scaling-infrastructure", "en", "domcontentloaded");
    const slugs = await keepReadingSlugs(page);
    expect(slugs).toHaveLength(3);
    expect(slugs).not.toContain("terraform-scaling-infrastructure");
    // Same infrastructure ground: shared tags (Terraform, AWS, DevOps) and similar text.
    expect(slugs).toEqual(expect.arrayContaining(["floci-aws-local-development-revolution", "lets-talk-microservices"]));
  });

  test("the same posts are suggested in Spanish", async ({ page }) => {
    await open(page, "/blog/terraform-scaling-infrastructure", "en", "domcontentloaded");
    const english = await keepReadingSlugs(page);
    await open(page, "/blog/terraform-scaling-infrastructure", "es", "domcontentloaded");
    expect(await keepReadingSlugs(page)).toEqual(english);
  });

  test("previous and next follow the publication date", async ({ page }) => {
    await open(page, "/blog/terraform-scaling-infrastructure");
    const pager = page.getByRole("navigation", { name: "Previous and next articles" });
    await expect(pager.getByRole("link", { name: /Previous article/ })).toHaveAttribute("href", "/blog/from-junior-to-senior-engineer");
    const next = pager.getByRole("link", { name: /Next article/ });
    await expect(next).toHaveAttribute("href", "/blog/adapting-to-new-jobs");
    await next.click();
    await expect(page).toHaveURL(/\/blog\/adapting-to-new-jobs$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Adapting");
  });

  test("in Spanish the pager speaks Spanish", async ({ page }) => {
    await open(page, "/blog/terraform-scaling-infrastructure", "es", "domcontentloaded");
    const pager = page.getByRole("navigation", { name: "Artículos anterior y siguiente" });
    await expect(pager.getByRole("link", { name: /Artículo anterior/ })).toHaveAttribute("href", "/blog/from-junior-to-senior-engineer");
    await expect(pager.getByRole("link", { name: /Siguiente artículo/ })).toHaveAttribute("href", "/blog/adapting-to-new-jobs");
  });

  test("the newest post only goes back, the oldest only forward", async ({ page }) => {
    await open(page, "/blog/visual-language-design-systems", "en", "domcontentloaded");
    let pager = page.getByRole("navigation", { name: "Previous and next articles" });
    await expect(pager.getByRole("link")).toHaveCount(1);
    await expect(pager.getByRole("link", { name: /Previous article/ })).toBeVisible();

    await open(page, "/blog/why-markdown-for-blogs", "en", "domcontentloaded");
    pager = page.getByRole("navigation", { name: "Previous and next articles" });
    await expect(pager.getByRole("link")).toHaveCount(1);
    await expect(pager.getByRole("link", { name: /Next article/ })).toBeVisible();
  });
});
