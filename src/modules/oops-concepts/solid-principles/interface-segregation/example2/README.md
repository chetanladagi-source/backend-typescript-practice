# Example 2 — Workers on a shift

**Scenario:** A `Worker` interface bundles `work`, `eat` and `sleep`, so a robot on the assembly
line has to implement human needs to be scheduled alongside people.

**Dead weight:** `eat` (a meaningless no-op log) and `sleep` (throws) on `RobotWorkerViolation`.
The scheduler cannot tell which `Worker` methods are safe to call.

**Fix:** Keep `Workable` for the shared capability and move `Feedable`/`Restable` into their own
contracts. `RobotWorker` implements only `Workable`; `HumanWorker` implements all three.

**Takeaway:** Model capabilities, not roles — the shift scheduler only needs `Workable`, so that
is the only contract it should depend on.
