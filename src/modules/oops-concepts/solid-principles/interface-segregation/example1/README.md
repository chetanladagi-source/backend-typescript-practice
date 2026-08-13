# Example 1 — Office machines

**Scenario:** A `Machine` interface declares `print`, `scan` and `fax`, so every device must
support all three even though the cheap office printer only prints.

**Dead weight:** `scan` and `fax` on `SimplePrinterViolation` — both only throw, which turns a
compile-time contract into a runtime landmine for any caller holding a `Machine`.

**Fix:** Split the contract into `Printer`, `Scanner` and `FaxMachine`. `SimplePrinter`
implements just `Printer`; `AllInOnePrinter` opts into all three because it really supports them.

**Takeaway:** A class should only be asked to implement methods it can actually honour; clients
depend on the narrow capability they use rather than one fat contract.
