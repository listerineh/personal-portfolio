import { test, expect } from "@playwright/test";
import { open } from "../support/setup";

test.use({ contextOptions: { reducedMotion: "reduce" } });

// The API routes are mocked: these specs check the interface, not email delivery.

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await open(page, "/contact");
  });

  test("explains what is missing before sending", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.getByText("Name must be at least 2 characters."),
    ).toBeVisible();
    await expect(page.getByLabel(/^Name/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("sends a valid message and confirms it", async ({ page }) => {
    let body: unknown;
    await page.route("**/api/send", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ json: { ok: true } });
    });
    await page.getByLabel(/^Name/).fill("Ana Tester");
    await page.getByLabel(/^Email/).fill("ana@example.com");
    await page
      .getByLabel(/^Message/)
      .fill("Hello, I would like to talk about a project.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.getByRole("heading", { name: "Message sent" }),
    ).toBeVisible();
    expect(body).toMatchObject({
      name: "Ana Tester",
      email: "ana@example.com",
    });
  });
});

test.describe("Newsletter unsubscribe", () => {
  test("without a link it asks for the address and emails one", async ({
    page,
  }) => {
    await page.route("**/api/newsletter/unsubscribe", (route) =>
      route.fulfill({ json: { message: "link-sent" } }),
    );
    await open(page, "/unsubscribe");
    await page.getByLabel(/Email Address/).fill("reader@example.com");
    await page.getByRole("button", { name: "Email me a link" }).click();
    await expect(
      page.getByText(/confirmation link is on its way/),
    ).toBeVisible();
  });

  test("a signed link only asks to confirm", async ({ page }) => {
    let body: Record<string, string> = {};
    await page.route("**/api/newsletter/unsubscribe", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ json: { message: "unsubscribed" } });
    });
    await open(page, "/unsubscribe?email=reader%40example.com&token=signed");
    await expect(
      page.getByText("Unsubscribe reader@example.com?"),
    ).toBeVisible();
    await page.getByRole("button", { name: "Unsubscribe" }).click();
    await expect(page.getByText(/successfully unsubscribed/)).toBeVisible();
    expect(body).toMatchObject({
      email: "reader@example.com",
      token: "signed",
    });
  });

  test("an invalid link falls back to the request form", async ({ page }) => {
    await page.route("**/api/newsletter/unsubscribe", (route) =>
      route.fulfill({ status: 400, json: { error: "invalid-link" } }),
    );
    await open(page, "/unsubscribe?email=reader%40example.com&token=expired");
    await page.getByRole("button", { name: "Unsubscribe" }).click();
    // Next.js adds its own role="alert" route announcer, so match the message text.
    await expect(page.getByText("This link isn't valid anymore", { exact: false })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Email me a link" }),
    ).toBeVisible();
  });
});

test.describe("Blog search", () => {
  test("narrows the list and reports the count", async ({ page }) => {
    await open(page, "/blog");
    const search = page
      .getByRole("searchbox")
      .or(page.getByRole("textbox", { name: /Search articles/ }))
      .first();
    await search.fill("terraform");
    await expect(page.getByText(/Found \d+ articles?/)).toBeVisible();
    await search.fill("zzqxnotaword");
    await expect(page.getByText("Found 0 articles")).toBeVisible();
  });
});
