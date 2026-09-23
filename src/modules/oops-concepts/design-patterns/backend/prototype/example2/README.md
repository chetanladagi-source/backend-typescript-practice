# Example 2 — Prototype registry

**Problem:** several call sites need "an authenticated JSON request", and building the header set
by hand each time invites drift.

**Pattern:** a `RequestRegistry` holding fully-built prototypes. `create(key)` returns
`prototype.clone()`, never the stored object itself — that last detail is the whole point, since
handing out the original would let one caller corrupt the preset for everyone.

**Takeaway:** this is Prototype's most practical form and the natural pairing with a factory: the
registry *is* a factory whose "construction" is a copy.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/prototype/example2/index.ts`
