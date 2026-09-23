# Example 2 — Typed event bus, and the listener leak

**Problem:** components in different branches of the tree need to react to the same event without
prop-drilling a callback through ten levels.

**Pattern:** a typed `EventBus`. The `AppEvents` interface makes event names and payloads
compile-checked, so `emit("cart:item-add")` (typo) will not build.

**The demo is really about two bugs:**

- **Error isolation.** Three logout listeners are registered and the middle one throws. Because
  `emit` wraps each in `try/catch`, the cache-clearing listener still runs. Without it, one broken
  subscriber silently breaks every subscriber behind it.
- **The unmount leak.** The same component mounts and unmounts three times. With cleanup, the
  listener count stays at 0 and one `cart:item-added` fires once. *Without* cleanup, three dead
  listeners survive and a single add fires **three times**, each updating a component that no
  longer exists.

That second one is the single most common Observer bug in React, and it is precisely what the
`useEffect` cleanup return value is for:

```ts
useEffect(() => bus.on("cart:item-added", handler), []);
```

Returning the unsubscribe function directly is the idiomatic fix.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/observer/example2/index.ts`
