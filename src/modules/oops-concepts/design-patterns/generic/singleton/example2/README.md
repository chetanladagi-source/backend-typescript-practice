# Example 2 — One cash drawer for the coffee shop

**Problem:** two counters and a manager report all need the till total. If each file does
`new CashDrawer()`, you have three tills and the books never balance.

**Pattern:** a private constructor plus `getInstance()`. Every caller receives the same object, so
a sale at counter A is visible in the manager report.

**What this adds over the parking-lot example:** `resetForTests()`. A Singleton without an escape
hatch is untestable — the second test inherits the first test's balance. Interviewers will ask
how you test it; this is the answer (or inject the drawer instead of calling `getInstance()`).

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/singleton/example2/index.ts`
