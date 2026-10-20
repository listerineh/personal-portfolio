import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

/** Width and height from a PNG's IHDR chunk. */
const pngSize = (body: Buffer) => ({ width: body.readUInt32BE(16), height: body.readUInt32BE(20) });

test.describe("Blog share images", () => {
  test("a post shares its own card, in both languages", async ({ page }) => {
    for (const locale of ["en", "es"] as const) {
      await open(page, "/blog/terraform-scaling-infrastructure", locale, "domcontentloaded");
      const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      expect(og).toMatch(/\/og\/blog\/terraform-scaling-infrastructure\.png\?v=\w+/);
      if (locale === "es") expect(og).toContain("lang=es");
      else expect(og).not.toContain("lang=");
      await expect(page.locator('meta[name="twitter:image"]').first()).toHaveAttribute("content", og!);
    }
  });

  test("the card is a 1200×630 PNG, cacheable", async ({ request }) => {
    for (const query of ["", "?lang=es"]) {
      const response = await request.get(`/og/blog/terraform-scaling-infrastructure.png${query}`);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toBe("image/png");
      expect(response.headers()["cache-control"]).toContain("public");
      expect(pngSize(await response.body())).toEqual({ width: 1200, height: 630 });
    }
  });

  test("unknown posts and malformed names are 404", async ({ request }) => {
    for (const path of ["/og/blog/no-such-post.png", "/og/blog/terraform-scaling-infrastructure.jpg", "/og/blog/..%2Fsecret.png"]) {
      expect((await request.get(path)).status(), path).toBe(404);
    }
  });
});
