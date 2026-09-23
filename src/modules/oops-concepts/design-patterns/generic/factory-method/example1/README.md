# Example 1 — EmployeeFactory

**Problem:** an HR system reads rows from a CSV. Each row has a role string, and the caller needs
back an `Employee` that computes its own bonus. Without a factory the caller writes
`if (role === "engineer") new Engineer(...) else if (...)` — and every place that constructs an
employee has to be updated when a new role appears.

**Pattern:** one `EmployeeFactory.create(role, name, salary)`. The role-to-class mapping lives in
one place; the rest of the app talks to the `Employee` interface.

**Two details worth pointing out:**

- **The call site is branch-free.** `rows.map(r => EmployeeFactory.create(r.role, r.name,
  r.salary))` — no `if/else`, no `switch`, no knowledge of subclasses. Adding an "Analyst" role
  touches the factory and nothing else.
- **`assertNever(role)` in the default branch.** `Role` is a union type; if a fifth role is added
  to the union and the factory forgets it, the `default` branch is no longer `never` and the
  build fails. Exhaustiveness enforced at compile time, not by review.

**Factory Method vs Simple Factory:** what is shown here is technically a *simple factory* — one
static method with a switch. The GoF Factory Method uses inheritance: an abstract creator class
whose subclasses each override `create()`. The simple factory is more common in TypeScript because
you rarely need the extra ceremony; naming both in an interview is worth the extra sentence.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/factory-method/example1/index.ts`
