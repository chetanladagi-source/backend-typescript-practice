# Example 1 — Employee reports as visitors

**Problem:** payroll, a staff directory and a tax estimate all walk the same Engineer / Manager /
Intern list. Putting `toPayroll()`, `toDirectory()` and `estimateTax()` on every class means
three methods × three types, and the next report makes it twelve.

**Pattern:** each employee exposes one method, `accept(visitor)`. Each report is a separate
visitor class. Adding a fourth report touches **zero** employee classes.

**The double dispatch is the mechanic to name.** `staff.accept(v)` first dispatches on the
employee's runtime type (`Engineer.accept` calls `visitor.visitEngineer`), then on the visitor's
type (which `visitEngineer` implementation runs). Two dynamic dispatches, hence the name.

**What the demo shows:** the same `walk()` drives three visitors. Payroll prints a line and
accumulates a total, Directory prints a badge, Tax accumulates silently and intern tax is 0.
Those decisions live on the visitor, not scattered across the employee classes.

**The cost, raise it first:** adding `Contractor` means editing `EmployeeVisitor` and all three
visitors. This trade is worth it when *types* are stable and *operations* keep arriving — true
for an org chart, false for a domain still being designed.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/visitor/example1/index.ts`
