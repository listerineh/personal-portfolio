import { test, expect, type Page } from "@playwright/test";
import { open, type Locale } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

// Collects every CSP violation the page reports, from the first script on.
async function watchViolations(page: Page) {
  await page.addInitScript(() => {
    const seen: string[] = [];
    (window as unknown as { __csp: string[] }).__csp = seen;
    document.addEventListener("securitypolicyviolation", (event) => {
      seen.push(`${event.effectiveDirective} blocked ${event.blockedURI || "inline"} (${event.sourceFile}:${event.lineNumber})`);
    });
  });
}
const violations = (page: Page) =>
  page.evaluate(() => (window as unknown as { __csp: string[] }).__csp);

const nonceOf = (csp: string | null) => csp?.match(/'nonce-([^']+)'/)?.[1];

test.describe("Content Security Policy", () => {
  test("public pages get the static policy, the same on every request", async ({ request }) => {
    const first = await request.get("/");
    const second = await request.get("/");
    const csp = first.headers()["content-security-policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'self'");
    expect(csp).toContain("report-uri /api/csp-report");
    // Prerendered and cached, so no per-request nonce.
    expect(nonceOf(csp)).toBeUndefined();
    expect(second.headers()["content-security-policy"]).toBe(csp);
  });

  test("owner routes get a fresh nonce, and their scripts carry it", async ({ request }) => {
    const first = await request.get("/slides/manage");
    const second = await request.get("/slides/manage");
    const csp = first.headers()["content-security-policy"];
    const nonce = nonceOf(csp);
    expect(nonce).toBeTruthy();
    const scriptSrc = csp.split(";").find((directive) => directive.trim().startsWith("script-src"));
    expect(scriptSrc).toContain("'strict-dynamic'");
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(nonceOf(second.headers()["content-security-policy"])).not.toBe(nonce);
    // The layout's inline script is allowed by hash; Next.js's own scripts carry the nonce.
    expect(csp).toMatch(/'sha256-[A-Za-z0-9+/=]+'/);
    const html = await first.text();
    const scripts = (html.match(/<script\b[^>]*\bsrc=[^>]*>/g) ?? []);
    expect(scripts.length).toBeGreaterThan(0);
    for (const tag of scripts) expect(tag).toContain(`nonce="${nonce}"`);
  });

  test("static files, API routes and Storybook are left out", async ({ request }) => {
    for (const path of ["/sw.js", "/robots.txt", "/api/spotify/tracks?ids="]) {
      const response = await request.get(path);
      expect(response.headers()["content-security-policy"], path).toBeUndefined();
    }
  });

  test("the report endpoint accepts both report formats", async ({ request }) => {
    const legacy = await request.post("/api/csp-report", {
      headers: { "content-type": "application/csp-report" },
      data: JSON.stringify({ "csp-report": { "document-uri": "https://listerineh.dev/", "effective-directive": "script-src-elem", "blocked-uri": "https://evil.example/x.js" } }),
    });
    expect(legacy.status()).toBe(204);
    const batch = await request.post("/api/csp-report", {
      headers: { "content-type": "application/reports+json" },
      data: JSON.stringify([{ type: "csp-violation", body: { documentURL: "https://listerineh.dev/", effectiveDirective: "img-src", blockedURL: "https://evil.example/x.png" } }]),
    });
    expect(batch.status()).toBe(204);
    const junk = await request.post("/api/csp-report", { data: "not json" });
    expect(junk.status()).toBe(204);
  });

  // Every route, both languages: nothing the site itself loads is blocked.
  const paths = [
    "/",
    "/about",
    "/projects",
    "/projects/kairo",
    "/projects/openstage",
    "/skills",
    "/blog",
    "/blog/why-markdown-for-blogs",
    "/contact",
    "/why",
    "/privacy",
    "/terms",
    "/unsubscribe",
    "/newsletter/confirm",
    "/this-page-does-not-exist",
  ];
  for (const locale of ["en", "es"] as Locale[]) {
    for (const path of paths) {
      test(`no violations on ${path} (${locale})`, async ({ page }) => {
        await watchViolations(page);
        await open(page, path, locale);
        // Lazy scripts (service worker registration) run after load.
        await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
        expect(await violations(page)).toEqual([]);
      });
    }
  }
});
