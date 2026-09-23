# Example 2 — URL filter builder

**Problem:** a product list has facets, search, sorting, and pagination. All of it belongs in the
query string so the page can be shared, bookmarked, and restored on refresh — but hand-concatenating
`?a=1&b=2` is where encoding bugs live.

**Pattern:** a builder that accumulates state and assembles the query string once in `build()`,
handling `encodeURIComponent` and repeated keys (`?category=audio&category=peripherals`) for you.

**The detail that matters most in a real app:** `build()` sorts the filter keys, so adding filters
in a different order yields a byte-identical URL — the demo asserts this. That stability is what
makes the URL usable as a **cache key** for React Query or SWR. Without it, the same filter set
produces different strings and you get spurious cache misses and duplicate network requests.

**Also note:** defaults like `page=1` are omitted, keeping the common URL clean.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/builder/example2/index.ts`
