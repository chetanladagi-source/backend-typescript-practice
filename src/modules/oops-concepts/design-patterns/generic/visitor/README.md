# Visitor — Generic

Full theory, double dispatch and interview questions:
[`../../backend/visitor/README.md`](../../backend/visitor/README.md)

The classic HR framing: an org of Engineers, Managers and Interns needs a payroll run, a
directory print-out and a tax estimate. The employee classes stay still; each new report is a
new visitor.

| Example | Scenario |
| --- | --- |
| `example1` | Employee tree accepted by Payroll, Directory and Tax visitors |
| `example2` | A coffee cart accepted by price, calorie and allergy visitors |
