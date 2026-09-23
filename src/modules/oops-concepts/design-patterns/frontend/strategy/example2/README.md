# Example 2 — Animation easing

**Problem:** the tween engine — interpolate `from` to `to` across N frames — is identical for every
animation. Only the acceleration curve differs, and hard-coding `t * t` inside the engine means one
engine per curve.

**Pattern:** `type Easing = (t: number) => number`. Five one-line strategies, one `tween()` context.
The demo renders each as a sparkline so the difference is visible in the terminal.

**Why this example is worth having next to the sorting one:** it shows a strategy that is *pure
maths* with no branching at all. There is no plausible `if/else` version — you would just have five
copies of `tween`. That makes the "family of interchangeable algorithms" definition very concrete.

**Note `easeOutBack` deliberately returns values above 1**, overshooting the target before settling.
The engine does not care, because the contract is only "take t, return progress". A well-chosen
strategy interface leaves room for implementations the author never anticipated.

**Real equivalent:** CSS `transition-timing-function` and every animation library's `easing`
option.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/strategy/example2/index.ts`
