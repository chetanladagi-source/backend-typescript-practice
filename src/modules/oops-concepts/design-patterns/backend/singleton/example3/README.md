# Example 3 — Application logger

**Problem:** every module wants to log, and the log level and buffer must be shared.

**Pattern:** the classic `getInstance()` class, plus `export const logger` to show the Node
module-cache shortcut that achieves the same thing with less ceremony.

**Takeaway:** the demo deliberately shows the downside too — `fromAuth.setLevel("error")` silently
changes behaviour for `fromPayments`. Shared mutable global state is the trade-off you are
accepting when you reach for this pattern.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/singleton/example3/index.ts`
