# Example 6 — Employee

**Scenario:** an employee record with salary rules, a database row, and a printed payslip.

**Violation:** `EmployeeGod` is an entity that also knows SQL and printing. The static in-class table
ties every instance to one storage strategy, and a payslip layout tweak forces a change to the class
that owns the bonus rule.

**Refactor:** `Employee` keeps only the rules, `EmployeeRepository` owns persistence,
`PayslipPrinter` owns the report, and `PayrollService` coordinates onboarding.

**Takeaway:** entities should model the domain, not their own database access or reports. This is the
Active Record temptation — convenient early, painful once either concern grows.
