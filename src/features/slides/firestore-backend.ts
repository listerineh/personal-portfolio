import { Timestamp, type Firestore } from 'firebase-admin/firestore';
import { HISTORY_LIMIT, type DeckBackend } from './repo';

/**
 * Decks in Firestore:
 * - slideDecks/{slug}                    { json, version, status, title, updatedAt }
 * - slideDecks/{slug}/versions/{version} { json, version, savedAt } — the previous HISTORY_LIMIT versions
 *
 * The deck itself is kept as one JSON string (the schema is the contract, Firestore just holds it); version, status
 * and title sit beside it for ordering and the console. Only the server touches these collections (Admin SDK);
 * client rules deny everything (firebase/firestore.rules).
 */

const DECKS = 'slideDecks';
const VERSIONS = 'versions';
// Zero-padded ids keep versions sorted in the console too.
const versionId = (version: number) => String(version).padStart(8, '0');

export function firestoreBackend(db: Firestore): DeckBackend {
  const decks = db.collection(DECKS);

  return {
    async get(slug) {
      const snap = await decks.doc(slug).get();
      return snap.exists ? (snap.get('json') as string) : null;
    },

    compareAndSet: (slug, expectedVersion, json, updatedAtMs) =>
      db.runTransaction(async (tx) => {
        const ref = decks.doc(slug);
        const versions = ref.collection(VERSIONS);
        // Transactions read everything before writing.
        const snap = await tx.get(ref);
        const older = snap.exists ? await tx.get(versions.orderBy('version', 'desc').limit(HISTORY_LIMIT)) : null;

        if (snap.exists) {
          const current = snap.get('version') as number;
          if (current !== expectedVersion) return { ok: false as const, currentVersion: current };
          tx.set(versions.doc(versionId(current)), { json: snap.get('json'), version: current, savedAt: snap.get('updatedAt') });
          // The archived copy plus HISTORY_LIMIT - 1 older ones stay; the rest go.
          older?.docs.slice(HISTORY_LIMIT - 1).forEach((doc) => tx.delete(doc.ref));
        } else if (expectedVersion !== -1) {
          return { ok: false as const, currentVersion: -1 };
        }

        const deck = JSON.parse(json) as { version: number; status: string; title: string };
        tx.set(ref, { json, version: deck.version, status: deck.status, title: deck.title, updatedAt: Timestamp.fromMillis(updatedAtMs) });
        return { ok: true as const };
      }),

    // Removes the deck and its version history.
    remove: (slug) => db.recursiveDelete(decks.doc(slug)),

    async all() {
      const snap = await decks.orderBy('updatedAt', 'desc').get();
      return snap.docs.map((doc) => doc.get('json') as string);
    },

    async history(slug) {
      const snap = await decks.doc(slug).collection(VERSIONS).orderBy('version', 'desc').limit(HISTORY_LIMIT).get();
      return snap.docs.map((doc) => doc.get('json') as string);
    },
  };
}
