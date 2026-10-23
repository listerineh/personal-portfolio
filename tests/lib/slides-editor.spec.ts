import { test, expect } from "@playwright/test";
import { changeLayout, LAYOUT_FIELDS, LAYOUTS, setField, slideTemplate } from "../../src/features/slides/editor/fields";
import { slideSchema } from "../../src/features/slides/schema";

// Code-only checks (no page): the editor's per-layout config stays in step with the schema.

test.describe("Slides editor config", () => {
  test("every layout has fields and a template that already validates", () => {
    expect(LAYOUTS.sort()).toEqual(slideSchema.options.map((option) => option.shape.layout.value).sort());
    for (const layout of LAYOUTS) {
      expect(LAYOUT_FIELDS[layout].length, layout).toBeGreaterThan(0);
      const result = slideSchema.safeParse(slideTemplate(layout));
      expect(result.success, `${layout}: ${result.success ? "" : JSON.stringify(result.error.issues)}`).toBe(true);
    }
  });

  test("new slides get ids the schema accepts, and they don't repeat", () => {
    const ids = new Set(Array.from({ length: 50 }, () => slideTemplate("title").id));
    expect(ids.size).toBe(50);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]{1,40}$/);
  });

  test("changing layout keeps the id, notes, build and fields both layouts share", () => {
    const bullets = { ...slideTemplate("bullets", "keep-me"), title: "My title", notes: "Say this", build: true };
    const stats = changeLayout(bullets, "stats");
    expect(stats).toMatchObject({ id: "keep-me", layout: "stats", title: "My title", notes: "Say this", build: true });
    expect(slideSchema.safeParse(stats).success).toBe(true);

    const quote = changeLayout(bullets, "quote");
    expect(quote).not.toHaveProperty("build");
    expect(quote).not.toHaveProperty("items");
    expect(slideSchema.safeParse(quote).success).toBe(true);
  });

  test("emptying an optional field removes it; required fields keep the empty value for validation", () => {
    expect(setField({ title: "T", subtitle: "S" }, "subtitle", "", true)).toEqual({ title: "T" });
    expect(setField({ title: "T", links: [1] }, "links", [], true)).toEqual({ title: "T" });
    expect(setField({ title: "T" }, "title", "")).toEqual({ title: "" });
  });
});
