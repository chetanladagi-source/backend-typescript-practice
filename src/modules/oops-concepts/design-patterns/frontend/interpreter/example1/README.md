# Example 1 — A validation rule DSL

**Problem:** the form schema is authored in a CMS, so validation arrives as the string
`"required|min:8|max:64"`. It has to become real checks without a deploy every time someone edits a
rule.

**Pattern:** each rule word is a terminal expression class (`RequiredRule`, `MinRule`, `EmailRule`),
`RuleChain` is the non-terminal that composes them, and `parseRules` turns the string into that
tree. Adding a rule word is one class plus one `case`.

**Three design decisions worth explaining:**

- **The chain stops at the first failure.** An empty password should say "Password is required",
  not that plus "must be at least 8 characters". Short-circuiting lives in the composite, so every
  rule gets it for free.
- **`email` is wrapped in `WhenFilledRule`.** Otherwise an optional email field reports
  "must be a valid email" while empty. Composing a *decorator* around a rule is cheaper than giving
  every rule an "only if present" flag — and noticing that this is Decorator inside Interpreter is
  a good thing to say out loud.
- **An unknown rule throws.** If the CMS ships `iban` to an app version that does not know it, the
  alternative is skipping the rule silently and accepting invalid data. Failing loudly is the safe
  default; a production version would report it and fall back to server-side validation.

**Why not `eval("value.length >= 8")`?** Because the rule string comes from a server. An interpreter
can only do what its terminal classes allow, so the worst a malicious rule can do is throw.
`eval` would hand the attacker the page's cookies. This sandbox-by-construction argument is the
strongest case for Interpreter, and it is what interviewers are usually fishing for.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/interpreter/example1/index.ts`
