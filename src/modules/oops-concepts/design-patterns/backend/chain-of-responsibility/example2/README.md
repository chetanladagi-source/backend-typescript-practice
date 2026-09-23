# Example 2 — Expense approval

**Problem:** approval limits escalate by seniority, and the code that submits an expense should not
have to know the limit table.

**Pattern:** the *pure* chain. Each approver either approves (and stops) or escalates. The
submitter just calls `lead.review(expense)`.

**Contrast with example 1:** there, every handler ran and any could short-circuit. Here exactly one
handler acts. Both are Chain of Responsibility; being able to name the difference between the
pipeline and the pure form is a useful distinction to have ready.

**The fall-off-the-end case is handled explicitly:** `E-4` exceeds every limit and prints a manual
escalation message rather than silently doing nothing. "What happens when no handler takes it?" is
the standard follow-up question.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/chain-of-responsibility/example2/index.ts`
