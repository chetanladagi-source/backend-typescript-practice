# Example 2 — Typed event emitter

**Problem:** Node's `EventEmitter` is stringly-typed. `emit("user.registerd", ...)` compiles fine
and silently does nothing, and payload shapes are `any`.

**Pattern:** an `AppEvents` interface maps event names to payload types, and generics thread that
through `on` and `emit`. Typos and wrong payloads become compile errors — see the commented lines
at the bottom.

**The important behaviour:** the middle listener throws on purpose. Because `emit` wraps each
handler in `try/catch`, the CRM listener registered *after* it still runs. Without that isolation,
one broken subscriber silently breaks every subscriber behind it — a genuinely nasty production
bug and a good thing to raise unprompted in an interview.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/observer/example2/index.ts`
