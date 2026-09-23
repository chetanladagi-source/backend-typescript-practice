# Example 1 — Employee onboarding as a template

**Problem:** every new hire needs documents collected, identity verified, access provisioned and a
welcome email. Copy that sequence into Engineer / Intern / Manager functions and one of them will
forget verification.

**Pattern:** `Onboarding.run()` is the template method. It fixes the order and calls abstract
steps (`role`, `provisionAccess`) that each role must supply, plus a **hook** (`assignMentor`)
that already has a no-op default.

**The hook-method distinction is the interview sentence.** Intern overrides nothing optional and
still gets a correct welcome email. Engineer and Manager override `assignMentor` because they
want one. Required steps force a decision; hooks let you skip one.

**The sequence is the value.** `collectDocuments` and `verifyIdentity` are written once. A new
`AnalystOnboarding` cannot "forget" verification because it never owns the sequence — it only
fills in the blanks.

**Template Method vs Strategy:** both vary an algorithm. Template Method varies *steps inside a
fixed skeleton* via inheritance. Strategy varies the *whole algorithm* via composition. If the
order of steps is the product, use Template Method.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/template-method/example1/index.ts`
