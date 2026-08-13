# Example 9 - Employee bonus

Scenario: payroll computes an annual bonus that differs per employee role.

Violation: `LegacyBonusCalculator` branches on `employee.role`. Hiring interns
means editing payroll code, and the intern silently gets zero until someone
remembers to add the branch - a bug the type system cannot catch.

Fix: an abstract `Employee` with `bonus()`, one subclass per role, and
`PayrollService` calling the method polymorphically.

Takeaway: the runtime picks the right formula through dispatch, so `Intern` slots
in as a new subclass with no payroll change.
