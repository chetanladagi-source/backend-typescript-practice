# Example 2 — Invoice

**Scenario:** compute invoice totals with tax, render a printable document, persist it, email it.

**Violation:** `InvoiceGod` mixes pricing policy with presentation, storage and delivery. A tax-rate
change, a layout change and a switch from email to a customer portal all edit the same method, and
the totals cannot be unit-tested without producing text and side effects.

**Refactor:** `InvoiceCalculator` owns the math, `InvoiceFormatter` the layout, `InvoiceRepository`
the storage, `InvoiceMailer` the delivery, and `InvoiceService` only wires the steps together.

**Takeaway:** calculation, presentation and I/O are three different responsibilities. Splitting them
lets you change the tax rate without touching a single string.
