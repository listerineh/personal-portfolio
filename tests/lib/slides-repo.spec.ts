import { test, expect } from "@playwright/test";
import {
  createDeckRepo,
  memoryBackend,
  HISTORY_LIMIT,
  VersionConflictError,
  type DeckBackend,
} from "../../src/features/slides/repo";
import { firestoreBackend } from "../../src/features/slides/firestore-backend";
import { fakeFirestore } from "../support/fake-firestore";
import { deckSchema, type DeckInput } from "../../src/features/slides/schema";
import { testPresentation } from "../../src/features/slides/decks/test-presentation";

// Code-only checks (no page): deck storage, run against both backends (memory, and Firestore through a fake).

const seed = deckSchema.parse(testPresentation);
const fresh = (
  slug: string,
  status: DeckInput["status"] = "draft",
): DeckInput => ({
  ...testPresentation,
  slug,
  title: `Deck ${slug}`,
  status,
});

const backends: Record<string, () => DeckBackend> = {
  memory: memoryBackend,
  firestore: () => firestoreBackend(fakeFirestore().db),
};

for (const [name, makeBackend] of Object.entries(backends)) {
test.describe(`Deck repo (${name})`, () => {
  test("seeds are readable before anything is stored", async () => {
    const repo = createDeckRepo(makeBackend(), [seed]);
    expect((await repo.get(seed.slug))?.title).toBe(seed.title);
    expect((await repo.list()).map((deck) => deck.slug)).toEqual([seed.slug]);
    expect(await repo.get("missing")).toBeUndefined();
  });

  test("a new deck starts at version 1 and bumps on each save", async () => {
    const repo = createDeckRepo(makeBackend());
    const first = await repo.save(
      fresh("talk"),
      null,
      new Date("2026-10-23T10:00:00Z"),
    );
    expect(first.version).toBe(1);
    expect(first.updatedAt).toBe("2026-10-23T10:00:00.000Z");
    const second = await repo.save(
      { ...first, title: "Renamed" },
      first.version,
    );
    expect(second.version).toBe(2);
    expect((await repo.get("talk"))?.title).toBe("Renamed");
  });

  test("a stale editor can't overwrite a newer save", async () => {
    const repo = createDeckRepo(makeBackend());
    const first = await repo.save(fresh("talk"), null);
    await repo.save({ ...first, title: "Tab A" }, first.version);
    const stale = repo.save({ ...first, title: "Tab B" }, first.version);
    await expect(stale).rejects.toBeInstanceOf(VersionConflictError);
    await expect(stale).rejects.toMatchObject({ currentVersion: 2 });
    expect((await repo.get("talk"))?.title).toBe("Tab A");
  });

  test("creating a slug that exists is a conflict, not an overwrite", async () => {
    const repo = createDeckRepo(makeBackend());
    await repo.save(fresh("talk"), null);
    await expect(repo.save(fresh("talk"), null)).rejects.toBeInstanceOf(
      VersionConflictError,
    );
  });

  test("saving a seed stores it and the stored copy wins", async () => {
    const repo = createDeckRepo(makeBackend(), [seed]);
    await expect(
      repo.save({ ...seed, title: "Wrong base" }, seed.version + 3),
    ).rejects.toBeInstanceOf(VersionConflictError);
    const saved = await repo.save(
      { ...seed, title: "Edited seed" },
      seed.version,
    );
    expect(saved.version).toBe(seed.version + 1);
    expect((await repo.get(seed.slug))?.title).toBe("Edited seed");
    expect(
      (await repo.list()).filter((deck) => deck.slug === seed.slug),
    ).toHaveLength(1);
  });

  test("invalid decks are rejected before anything is written", async () => {
    const repo = createDeckRepo(makeBackend());
    await expect(
      repo.save({ ...fresh("talk"), accent: "red" }, null),
    ).rejects.toThrow();
    expect(await repo.get("talk")).toBeUndefined();
  });

  test("history keeps the previous versions, newest first, capped", async () => {
    const repo = createDeckRepo(makeBackend());
    let deck = await repo.save(fresh("talk"), null);
    for (let i = 0; i < HISTORY_LIMIT + 3; i++)
      deck = await repo.save(
        { ...deck, title: `v${deck.version + 1}` },
        deck.version,
      );
    const history = await repo.history("talk");
    expect(history).toHaveLength(HISTORY_LIMIT);
    expect(history[0].version).toBe(deck.version - 1);
  });

  test("list is newest first and remove forgets a deck", async () => {
    const repo = createDeckRepo(makeBackend());
    await repo.save(
      { ...fresh("old"), event: { name: "A", date: "2025-01-10" } },
      null,
    );
    await repo.save(
      { ...fresh("new"), event: { name: "B", date: "2026-05-02" } },
      null,
    );
    expect((await repo.list()).map((deck) => deck.slug)).toEqual([
      "new",
      "old",
    ]);
    await repo.remove("new");
    expect((await repo.list()).map((deck) => deck.slug)).toEqual(["old"]);
  });
});
}

test.describe("Firestore layout", () => {
  test("a deck is one document with its versions underneath, trimmed to the limit", async () => {
    const { db, store } = fakeFirestore();
    const repo = createDeckRepo(firestoreBackend(db));
    let deck = await repo.save(fresh("talk", "published"), null);
    for (let i = 0; i < HISTORY_LIMIT + 2; i++) deck = await repo.save({ ...deck, title: `v${deck.version + 1}` }, deck.version);

    const doc = store.get("slideDecks/talk")!;
    expect(doc).toMatchObject({ version: deck.version, status: "published", title: deck.title });
    expect(JSON.parse(doc.json as string).version).toBe(deck.version);
    const versions = [...store.keys()].filter((path) => path.startsWith("slideDecks/talk/versions/"));
    expect(versions).toHaveLength(HISTORY_LIMIT);
    expect(versions).toContain(`slideDecks/talk/versions/${String(deck.version - 1).padStart(8, "0")}`);

    await repo.remove("talk");
    expect([...store.keys()].filter((path) => path.startsWith("slideDecks/talk"))).toHaveLength(0);
  });
});
