# Example 1 — HTTP request builder

**Problem:** a request has a method, url, headers, body, timeout, retries... a positional
constructor becomes unreadable and easy to get wrong.

**Pattern:** one method per field, each returning `this`, terminated by `build()`.

**The key detail:** cross-field validation ("a GET cannot have a body") lives in `build()`, not in
the setters — at setter time you do not yet know what else is coming. The demo triggers that error
on purpose.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/builder/example1/index.ts`
