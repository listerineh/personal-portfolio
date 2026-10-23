import { test, expect } from "@playwright/test";
import { isOwnerGithubId } from "../../src/features/slides/owner";
import { buildCsp } from "../../src/lib/csp";

// Code-only checks (no page): who counts as the slides owner, and the CSP the GitHub sign-in needs.

test.describe("Slides owner", () => {
  test("only the configured GitHub id is the owner", () => {
    expect(isOwnerGithubId("1234", "1234")).toBe(true);
    expect(isOwnerGithubId(1234, " 1234 ")).toBe(true);
    expect(isOwnerGithubId("12345", "1234")).toBe(false);
    expect(isOwnerGithubId(undefined, "1234")).toBe(false);
    expect(isOwnerGithubId(null, "1234")).toBe(false);
  });

  test("fails closed when the owner isn't configured or is malformed", () => {
    expect(isOwnerGithubId("1234", undefined)).toBe(false);
    expect(isOwnerGithubId("1234", "")).toBe(false);
    expect(isOwnerGithubId("listerineh", "listerineh")).toBe(false);
  });

  test("the CSP lets the sign-in form hand off to GitHub, and nowhere else", () => {
    const formAction = buildCsp("n", { mode: "production" })
      .split("; ")
      .find((directive) => directive.startsWith("form-action"));
    expect(formAction).toBe("form-action 'self' https://github.com");
  });
});
