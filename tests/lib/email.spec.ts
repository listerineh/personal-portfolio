import { test, expect } from "@playwright/test";
import { isoWeek } from "../../src/lib/server/stats";
import { startHereEmail, weeklyDigestEmail, type WeeklyDigest } from "../../src/lib/email/templates";

// Code-only checks (no page): the week keys behind the digest counters and the two scheduled emails.

test.describe("Weekly stats", () => {
  test("weeks follow ISO 8601, across year boundaries", () => {
    expect(isoWeek(new Date("2026-10-19T12:00:00Z"))).toBe("2026-W43"); // Monday
    expect(isoWeek(new Date("2026-10-25T23:00:00Z"))).toBe("2026-W43"); // Sunday, same week
    expect(isoWeek(new Date("2027-01-01T12:00:00Z"))).toBe("2026-W53"); // Friday, still last year's week
    expect(isoWeek(new Date("2024-12-30T12:00:00Z"))).toBe("2025-W01"); // Monday, already next year's week
  });
});

test.describe("Scheduled emails", () => {
  const digest: WeeklyDigest = {
    range: "Oct 12 – Oct 18, 2026",
    subscribers: { total: 42, joined: 3, left: 1 },
    contactMessages: 2,
    views: { total: 512, top: [{ slug: "terraform-scaling-infrastructure", title: "Terraform <b>", views: 120 }] },
    reactions: 9,
    csp: { total: 4, top: [{ label: "img-src evil.example", count: 4 }] },
  };

  test("the digest shows the week, escaped", () => {
    const { subject, html, text } = weeklyDigestEmail(digest);
    expect(subject).toBe("Weekly digest · Oct 12 – Oct 18, 2026");
    expect(html).toContain("+3");
    expect(html).toContain("Terraform &lt;b&gt;: 120 views");
    expect(html).not.toContain("Terraform <b>");
    expect(text).toContain("img-src evil.example (4)");
  });

  test("the first digest explains there is nothing to compare yet", () => {
    const { html } = weeklyDigestEmail({ ...digest, views: null, reactions: null });
    expect(html).toContain("First digest");
  });

  test("the follow-up links the most-read posts and the way out", () => {
    const posts = [
      { slug: "a-post", title: "A post", excerpt: "First" },
      { slug: "another", title: "Another", excerpt: "Second" },
    ];
    const es = startHereEmail({ lang: "es", posts, unsubscribeUrl: "https://listerineh.dev/unsubscribe?x" });
    expect(es.subject).toBe("Tres posts para empezar");
    expect(es.html).toContain("/blog/a-post");
    expect(es.html).toContain("/blog/another");
    expect(es.html).toContain("Darse de baja");
    expect(startHereEmail({ lang: "en", posts }).html).not.toContain("Unsubscribe");
  });
});

test.describe("Weekly digest route", () => {
  test("only Vercel Cron (with CRON_SECRET) may run it", async ({ request }) => {
    expect((await request.get("/api/cron/weekly-digest")).status()).toBe(401);
    const forged = await request.get("/api/cron/weekly-digest", { headers: { authorization: "Bearer guess" } });
    expect(forged.status()).toBe(401);
  });
});
