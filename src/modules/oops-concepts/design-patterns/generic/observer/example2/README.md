# Example 2 — Coffee order board

**Problem:** when a drink is ready, the pickup display, the customer app and loyalty points all
need to know. Wiring those three to the barista directly means the barista imports every surface.

**Pattern:** `OrderBoard` is the subject. Surfaces subscribe. The barista only calls `ready()` /
`cancel()`. Loyalty throwing must not stop the customer push — the board isolates errors.

**Same Observer mechanics as the parking lot**, different event. Unsubscribe on the display is
the same leak-prevention idea as a React cleanup.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/observer/example2/index.ts`
