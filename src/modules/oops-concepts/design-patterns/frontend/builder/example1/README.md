# Example 1 — Form schema builder

**Problem:** describing a signup form as a plain object literal means deeply nested config with
optional keys everywhere, and validation rules expressed as data that something else must
interpret.

**Pattern:** `field("email").required().email().build()` — one method per constraint, each
returning `this`. This is the Zod/Yup shape, and building your own once makes those libraries stop
looking like magic.

**Two things worth copying:**

- **Rules are ordered.** `required()` before `min(8)` means an empty field reports "required"
  rather than "at least 8 characters". `validate` uses `.find()` to report only the first failure,
  which is what users should see.
- **Smart defaults.** The constructor derives `"Full name"` from `fullName`, so `labelled()` is
  only needed when the default is wrong. A good builder makes the common case shortest.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/builder/example1/index.ts`
