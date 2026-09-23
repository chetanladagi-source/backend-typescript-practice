# Example 1 — Uniform Employee and Team

**Problem:** an org chart has individuals (leaves) and teams (branches, possibly nested). Payroll,
reporting and search all want to run on "some node in the tree", and every one of them will grow an
`if (isTeam) ... else ...` unless the two shapes look the same to the caller.

**Pattern:** `OrgUnit` is the shared interface. `Employee` implements it as a leaf; `Team`
implements it as a composite that recurses over its children. The recursion is *inside* the class,
so `company.totalSalary()` reaches every leaf with no visitor loops at the call site.

**Two ideas the demo makes concrete:**

- **A team inside a team.** "Payments Squad" is a `Team` added to `Engineering`, which is itself a
  `Team`. `add(unit: OrgUnit)` accepts either shape by type, so nesting is free. This is the
  behaviour Composite exists to enable, and it is what File System `Folder`, DOM `Element`, React
  component tree and GUI menus all share.
- **No `instanceof` at the call site.** `company.totalSalary()` and `ada.totalSalary()` are the same
  method. Print, headcount, sum — all uniform. Users of the tree write ordinary code; the recursion
  is a private implementation detail of `Team`.

**Trade-off worth stating:** the shared interface is a lowest common denominator. `Team.add(...)`
makes no sense on `Employee`, so either it lives on `Team` only (making callers narrow the type
they already had) or on the interface with a no-op default (violating the LSP). The GoF book calls
this out; there is no perfect answer, and picking one and explaining why is the answer an
interviewer wants.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/composite/example1/index.ts`
