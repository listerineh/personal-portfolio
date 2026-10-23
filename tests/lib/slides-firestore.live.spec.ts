import { test, expect } from "@playwright/test";
import { getBucket, getDb } from "../../src/lib/server/firebase";
import { firestoreBackend } from "../../src/features/slides/firestore-backend";
import {
  createDeckRepo,
  VersionConflictError,
} from "../../src/features/slides/repo";
import { testPresentation } from "../../src/features/slides/decks/test-presentation";
import { processImage, storeDeckImage } from "../../src/features/slides/images";
import sharp from "sharp";

// Live check against the real Firebase project. Opt-in: needs the FIREBASE_* variables and SLIDES_FIRESTORE_LIVE=1,
// so CI and everyday runs skip it. It writes a throwaway deck (and file), checks the rules of the game, then deletes them.

const live = process.env.SLIDES_FIRESTORE_LIVE === "1";

test.describe("Slides on real Firebase", () => {
  test.skip(
    !live,
    "Set SLIDES_FIRESTORE_LIVE=1 and the FIREBASE_* variables to run",
  );
  test.describe.configure({ mode: "serial", timeout: 60_000 });

  const slug = `smoke-${Date.now().toString(36)}`;

  test.afterAll(async () => {
    const db = getDb();
    if (db) await createDeckRepo(firestoreBackend(db)).remove(slug);
  });

  test("Firebase is configured", () => {
    // Names only, never values.
    const required = [
      "FIREBASE_PROJECT_ID",
      "FIREBASE_CLIENT_EMAIL",
      "FIREBASE_PRIVATE_KEY",
      "FIREBASE_STORAGE_BUCKET",
    ];
    expect(
      required.filter((name) => !process.env[name]?.trim()),
      "missing variables",
    ).toEqual([]);
    expect(
      process.env.FIREBASE_PRIVATE_KEY,
      "FIREBASE_PRIVATE_KEY should be the PEM key",
    ).toMatch(/^-----BEGIN PRIVATE KEY-----/);
    expect(getDb()).not.toBeNull();
  });

  test("decks save, version, conflict, keep history and delete", async () => {
    const repo = createDeckRepo(firestoreBackend(getDb()!));
    const created = await repo.save(
      { ...testPresentation, slug, status: "draft", title: "Smoke test" },
      null,
    );
    expect(created.version).toBe(1);

    const edited = await repo.save(
      { ...created, title: "Smoke test, edited" },
      created.version,
    );
    expect(edited.version).toBe(2);
    await expect(
      repo.save({ ...created, title: "Stale tab" }, created.version),
    ).rejects.toBeInstanceOf(VersionConflictError);

    expect((await repo.get(slug))?.title).toBe("Smoke test, edited");
    expect((await repo.history(slug)).map((deck) => deck.version)).toEqual([1]);
    expect((await repo.list()).some((deck) => deck.slug === slug)).toBe(true);

    await repo.remove(slug);
    expect(await repo.get(slug)).toBeUndefined();
    expect(await repo.history(slug)).toEqual([]);
  });

  test("the storage bucket accepts and deletes a file", async () => {
    const bucket = getBucket();
    expect(bucket, "FIREBASE_STORAGE_BUCKET").not.toBeNull();
    const file = bucket!.file(`slides/_smoke/${slug}.txt`);
    await file.save("ok", { contentType: "text/plain" });
    expect((await file.exists())[0]).toBe(true);
    await file.delete();
  });

  test("an uploaded slide image is stored and readable by its URL", async () => {
    const png = await sharp({ create: { width: 64, height: 48, channels: 3, background: "#d97706" } }).png().toBuffer();
    const stored = await storeDeckImage(slug, await processImage(png, "image/png"));
    expect(stored, "FIREBASE_STORAGE_BUCKET").not.toBeNull();
    const response = await fetch(stored!.src);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/webp");
    const path = decodeURIComponent(new URL(stored!.src).pathname.split("/o/")[1]);
    await getBucket()!.file(path).delete();
  });
});
