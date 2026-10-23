"use server";

import { redirect } from "next/navigation";
import { requestLocale } from "@/lib/metadata";
import { NotOwnerError, requireOwner } from "./auth";
import { VersionConflictError } from "./repo";
import { deckSchema, SLUG_PATTERN, type Deck, type DeckInput } from "./schema";
import { deleteDeck, saveDeck } from "./store";
import { BRAND_AMBER } from "./theme";
import { highlightCode } from "./highlight";
import type { CodeTokens } from "./code-tokens";

/**
 * The editor's only way to write. Every action checks the owner first; nothing here trusts the client's copy of the
 * deck beyond what the schema accepts.
 */

export type SaveResult =
  | { ok: true; deck: Deck }
  | { ok: false; reason: "conflict"; currentVersion: number }
  | {
      ok: false;
      reason: "invalid";
      issues: { path: string; message: string }[];
    }
  | { ok: false; reason: "unauthorized" | "error" };

export async function saveDeckAction(
  input: DeckInput,
  expectedVersion: number,
): Promise<SaveResult> {
  try {
    await requireOwner();
    const parsed = deckSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        reason: "invalid",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }
    return { ok: true, deck: await saveDeck(parsed.data, expectedVersion) };
  } catch (error) {
    if (error instanceof NotOwnerError)
      return { ok: false, reason: "unauthorized" };
    if (error instanceof VersionConflictError)
      return {
        ok: false,
        reason: "conflict",
        currentVersion: error.currentVersion,
      };
    console.error("[slides] save failed", error);
    return { ok: false, reason: "error" };
  }
}

export type CreateState =
  | { error?: "slug" | "title" | "exists" | "unauthorized" }
  | undefined;

/** Creates a draft with a cover and a closing slide, then opens it in the editor. */
export async function createDeckAction(
  _previous: CreateState,
  form: FormData,
): Promise<CreateState> {
  try {
    await requireOwner();
  } catch {
    return { error: "unauthorized" };
  }
  const title = String(form.get("title") ?? "").trim();
  const slug = String(form.get("slug") ?? "").trim();
  if (!title) return { error: "title" };
  if (!SLUG_PATTERN.test(slug) || slug.length > 80) return { error: "slug" };

  const lang = await requestLocale();
  const deck: DeckInput = {
    slug,
    title,
    description: title,
    lang,
    status: "draft",
    accent: BRAND_AMBER,
    theme: "light",
    updatedAt: new Date().toISOString(),
    version: 0,
    slides: [
      { id: "cover", layout: "title", title },
      {
        id: "thanks",
        layout: "closing",
        title: lang === "es" ? "¡Gracias!" : "Thank you!",
      },
    ],
  };
  try {
    await saveDeck(deck, null);
  } catch (error) {
    if (error instanceof VersionConflictError) return { error: "exists" };
    throw error;
  }
  redirect(`/slides/${slug}/edit`);
}

export async function deleteDeckAction(slug: string): Promise<{ ok: boolean }> {
  try {
    await requireOwner();
  } catch {
    return { ok: false };
  }
  await deleteDeck(slug);
  redirect("/slides/manage");
}

/** Highlights a code slide while it is edited (the viewer does the same on the server for the audience). */
export async function highlightCodeAction(code: string, language: string): Promise<CodeTokens | null> {
  try {
    await requireOwner();
  } catch {
    return null;
  }
  if (code.length > 4000 || !/^[a-z0-9+#-]{1,20}$/.test(language)) return null;
  return highlightCode(code, language).catch(() => null);
}
