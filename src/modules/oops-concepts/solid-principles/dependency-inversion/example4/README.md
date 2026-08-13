# Example 4 — Report logging

**Scenario:** `ReportService` totals some rows and records what it did.

**Before:** the arrow pointed `ReportService -> DiskFileLogger`. Testing the arithmetic meant
producing log files, and output could not be routed anywhere else.

**After:** the service depends on the `Logger` interface. `FileLogger` writes lines and
`CollectingLogger` keeps them in memory so the demo can assert on the warning path.

**Takeaway:** logging is infrastructure. Injecting it lets the same policy write to disk in
production and to an assertable buffer in a test.
