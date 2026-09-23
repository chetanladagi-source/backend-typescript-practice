# Example 3 — Document review workflow

**Problem:** a document moves draft → review → published, rejection sends it back to draft, and the
rules depend on *who* is acting: only the author submits, and authors cannot approve their own work.

**Pattern:** one class per state, with the role checks living inside the state that cares about
them.

**Why this example exists alongside the other two:** it is the first one with a **cycle**
(`in-review → draft → in-review`) and with **actor-dependent** rules. Real workflows almost always
have both, and it shows State handles more than a straight-line progression.

**Takeaway:** the rule "authors cannot approve their own document" lives in exactly one place —
`InReview.approve`. In a status-enum version that check would sit in a service method alongside
unrelated guards for every other status.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/state/example3/index.ts`
