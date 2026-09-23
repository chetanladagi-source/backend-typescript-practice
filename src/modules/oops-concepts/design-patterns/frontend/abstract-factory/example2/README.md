# Example 2 — Web vs email render targets

**Problem:** the welcome screen and the welcome email should say the same thing and look
consistent, but email clients strip CSS classes, ignore flexbox, and mangle `<button>`. Maintaining
two hand-written templates means they drift.

**Pattern:** `UiKit` creates a heading, a layout, and a CTA. `WebKit` emits modern
flexbox-and-classes HTML; `EmailKit` emits table-based, inline-styled, Outlook-safe HTML.
`welcomeTemplate()` is written **once** and rendered by either.

**Why this is a better interview example than light/dark:** the two families are genuinely
*structurally* different — `<div class="flex">` versus a `<table role="presentation">`. That makes
the point that an abstract factory swaps whole implementation strategies, not just colour values.
Light/dark could arguably be done with CSS variables; this could not.

**Mixing here would be a real defect:** a web layout containing an email CTA would render a
correctly-styled button inside a flex container that Outlook cannot parse. The factory makes the
mismatch impossible.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/abstract-factory/example2/index.ts`
