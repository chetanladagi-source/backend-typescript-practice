# Example 2 — Input formatters

**Problem:** a card-number field must strip non-digits, cap at 16, and group in fours as the user
types. A phone field wants almost the same rules with different numbers. A coupon field wants trim
and uppercase. Writing a bespoke `formatCardNumber` for each is how you end up with six
near-identical functions.

**Pattern:** six tiny decorators, each wrapping a `Formatter` and returning a `Formatter`. Every
field composes the ones it needs.

**Why this example earns its place:** unlike the HOC example, the decorators here are *genuinely
reusable across contexts*. `StripNonDigits`, `MaxLength`, and `GroupEvery` combine into a card
field, a phone field, and a masked read-only display — and the masked variant reuses the exact same
inner stack with one extra layer. Six small classes cover far more than six hand-written formatters
would.

**Order is semantic again:** grouping must come *after* capping, or the separator characters get
counted toward the 16-digit limit.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/decorator/example2/index.ts`
