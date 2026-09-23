// Adapter (frontend) — Example 2: one storage interface over several backends.
// Needed because localStorage throws in Safari private mode and does not exist in SSR.

export interface KeyValueStore {
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  keys(): string[];
}

// --- Adaptee: the Web Storage API, faked here so this runs in Node ---
class WebStorageLike {
  private readonly data: Map<string, string> = new Map<string, string>();

  constructor(private readonly label: string, private readonly throwOnWrite: boolean = false) {}

  public getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  public setItem(key: string, value: string): void {
    if (this.throwOnWrite) {
      // Exactly what Safari private mode does when the quota is 0.
      throw new Error("QuotaExceededError");
    }
    console.log(`  [${this.label}] setItem(${key})`);
    this.data.set(key, value);
  }
  public removeItem(key: string): void {
    this.data.delete(key);
  }
  public get length(): number {
    return this.data.size;
  }
  public key(i: number): string | null {
    return [...this.data.keys()][i] ?? null;
  }
}

// Adapter: string-only API -> typed, JSON-aware API.
class WebStorageAdapter implements KeyValueStore {
  constructor(private readonly storage: WebStorageLike) {}

  public get<T>(key: string): T | undefined {
    const raw: string | null = this.storage.getItem(key);
    if (raw === null) {
      return undefined;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      // Corrupt entries must not crash the app on boot.
      console.log(`  [storage] dropping corrupt value at "${key}"`);
      this.storage.removeItem(key);
      return undefined;
    }
  }

  public set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public keys(): string[] {
    return Array.from({ length: this.storage.length }, (_: unknown, i: number): string =>
      String(this.storage.key(i)),
    );
  }
}

// Adapter over a plain Map: the SSR / private-mode fallback.
class MemoryStoreAdapter implements KeyValueStore {
  private readonly data: Map<string, unknown> = new Map<string, unknown>();

  public get<T>(key: string): T | undefined {
    return this.data.get(key) as T | undefined;
  }
  public set<T>(key: string, value: T): void {
    console.log(`  [memory] set(${key})`);
    this.data.set(key, value);
  }
  public remove(key: string): void {
    this.data.delete(key);
  }
  public keys(): string[] {
    return [...this.data.keys()];
  }
}

// Pick a backend that actually works in this environment.
function createStore(candidate: WebStorageLike | undefined): KeyValueStore {
  if (candidate === undefined) {
    console.log("  no web storage (SSR) -> memory");
    return new MemoryStoreAdapter();
  }
  try {
    candidate.setItem("__probe__", "1");
    candidate.removeItem("__probe__");
    return new WebStorageAdapter(candidate);
  } catch {
    console.log("  web storage unavailable (private mode) -> memory");
    return new MemoryStoreAdapter();
  }
}

// ---- Demo ----

interface Prefs {
  theme: string;
  sidebarOpen: boolean;
}

console.log("normal browser:");
const store: KeyValueStore = createStore(new WebStorageLike("localStorage"));
store.set<Prefs>("prefs", { theme: "dark", sidebarOpen: true });
console.log("  read back:", store.get<Prefs>("prefs"));

console.log("\nSafari private mode:");
const fallback: KeyValueStore = createStore(new WebStorageLike("localStorage", true));
fallback.set<Prefs>("prefs", { theme: "light", sidebarOpen: false });
console.log("  read back:", fallback.get<Prefs>("prefs"));

console.log("\nserver-side render:");
const ssr: KeyValueStore = createStore(undefined);
console.log("  read back:", ssr.get<Prefs>("prefs"), "(nothing stored, as expected)");
