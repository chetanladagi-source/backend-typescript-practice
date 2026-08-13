# Example 8 - Intern extends Employee

**Scenario:** Payroll prints a payslip by adding annual pay and bonus for any `Employee`.

**Broken contract:** `Employee.calculateBonus()` promises to return a number for every employee, zero included. `Intern` overrides it with a throw, so the whole payslip calculation fails rather than reporting a zero bonus.

**Fix:** `Employee` keeps `calculateAnnualPay()`. `BonusEligible` adds `calculateBonus()` and is implemented by `Developer`; `Intern` exposes internship details instead, and payroll treats a non-eligible employee as a zero bonus.

**Takeaway:** If a subtype cannot produce a meaningful value, the method does not belong on the shared base. Returning zero would also be acceptable here, but only if zero is genuinely part of the base contract.
