# Example 2 — Analytics client with buffering

**Problem:** components start firing analytics events during first paint, before the app has called
`init()` with the write key. Dropping those events loses exactly the ones you most want (page view,
first interaction).

**Pattern:** one `Analytics` instance that queues events while uninitialised and flushes them the
moment `init()` runs.

**Why a singleton is genuinely right here:** the buffer must be shared. If two components each
created their own tracker, each would have its own queue and only one would ever get flushed.
This is a case where "two instances would be a bug", not just wasteful.

**Two realistic details:** a second `init()` is ignored rather than resetting the client (providers
remount in development), and `export const analytics` shows the module-level form you would
actually import.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/singleton/example2/index.ts`
