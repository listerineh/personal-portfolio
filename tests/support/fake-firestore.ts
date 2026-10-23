import type { Firestore } from "firebase-admin/firestore";

/**
 * Just enough of Firestore for the slides backend, in memory: documents and subcollections by path, ordered queries
 * with limit, transactions (reads first, writes applied together at the end) and recursive delete.
 */

type Data = Record<string, unknown>;
type Store = Map<string, Data>;

const sortable = (value: unknown) =>
  value && typeof value === "object" && "toMillis" in value ? (value as { toMillis(): number }).toMillis() : (value as number);

class Snapshot {
  constructor(
    readonly ref: DocRef,
    private readonly data: Data | undefined,
  ) {}
  get exists() {
    return this.data !== undefined;
  }
  get(field: string) {
    return this.data?.[field];
  }
}

class DocRef {
  constructor(
    private readonly store: Store,
    readonly path: string,
  ) {}
  get id() {
    return this.path.split("/").pop()!;
  }
  collection(name: string) {
    return new Query(this.store, `${this.path}/${name}`);
  }
  async get() {
    return new Snapshot(this, this.store.get(this.path));
  }
}

class Query {
  constructor(
    private readonly store: Store,
    private readonly path: string,
    private readonly order?: { field: string; dir: "asc" | "desc" },
    private readonly max?: number,
  ) {}
  doc(id: string) {
    return new DocRef(this.store, `${this.path}/${id}`);
  }
  orderBy(field: string, dir: "asc" | "desc" = "asc") {
    return new Query(this.store, this.path, { field, dir }, this.max);
  }
  limit(n: number) {
    return new Query(this.store, this.path, this.order, n);
  }
  async get() {
    const prefix = `${this.path}/`;
    let docs = [...this.store.entries()]
      .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes("/"))
      .map(([path, data]) => new Snapshot(new DocRef(this.store, path), data));
    if (this.order) {
      const { field, dir } = this.order;
      docs.sort((a, b) => (sortable(a.get(field)) - sortable(b.get(field))) * (dir === "desc" ? -1 : 1));
    }
    if (this.max !== undefined) docs = docs.slice(0, this.max);
    return { docs };
  }
}

export function fakeFirestore() {
  const store: Store = new Map();
  const db = {
    collection: (name: string) => new Query(store, name),
    async runTransaction<T>(fn: (tx: unknown) => Promise<T>): Promise<T> {
      const writes: (() => void)[] = [];
      let wrote = false;
      const tx = {
        get: (target: DocRef | Query) => {
          if (wrote) throw new Error("Transactions must read before writing");
          return target.get();
        },
        set: (ref: DocRef, data: Data) => {
          wrote = true;
          writes.push(() => store.set(ref.path, { ...data }));
        },
        delete: (ref: DocRef) => {
          wrote = true;
          writes.push(() => store.delete(ref.path));
        },
      };
      const result = await fn(tx);
      writes.forEach((write) => write());
      return result;
    },
    async recursiveDelete(ref: DocRef) {
      for (const path of [...store.keys()]) if (path === ref.path || path.startsWith(`${ref.path}/`)) store.delete(path);
    },
  };
  return { db: db as unknown as Firestore, store };
}
