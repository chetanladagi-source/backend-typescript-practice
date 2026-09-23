# Example 2 — Storage adapter

**Problem:** `localStorage` only stores strings, **throws** in Safari private mode, and does not
exist at all during server-side rendering. Calling it directly from components means
`JSON.parse` everywhere and a white screen for some users.

**Pattern:** a typed `KeyValueStore` interface with a `WebStorageAdapter` and a
`MemoryStoreAdapter`. `createStore()` probes with a throwaway write and falls back to memory when
that fails.

**Three real-world details worth stealing:**

- **The probe write.** Feature-detecting `"localStorage" in window` is not enough; private mode has
  the API present but the quota at zero. You have to actually try writing.
- **Corrupt values are dropped, not thrown.** A bad JSON blob from an old app version would
  otherwise crash every page load, and the user has no way to clear it.
- **The memory fallback keeps the app working**, just without persistence. Degrading beats
  crashing.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/adapter/example2/index.ts`
