# Composite — Generic

Full theory and interview questions:
[`../../backend/composite/README.md`](../../backend/composite/README.md)

The classic framing: an org chart. A `Team` contains employees, and possibly sub-teams. Reporting
functions like "total salary" or "headcount" should work on any node — leaf or composite — without
knowing which it is.

| Example | Scenario |
| --- | --- |
| `example1` | An `OrgUnit` hierarchy where `Employee` (leaf) and `Team` (composite) share one interface |
