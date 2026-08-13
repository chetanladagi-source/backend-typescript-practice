# Example 2 — Taking payment

**Scenario:** `OrderService` charges a card and writes a receipt line.

**Before:** the arrow pointed `OrderService -> StripeClient`. The vendor SDK was instantiated
inside the service, so the ordering rules could not be exercised without a real charge.

**After:** the service depends on the `PaymentGateway` interface; `StripeGateway` and
`FakePaymentGateway` implement it and the caller decides.

**Takeaway:** third-party clients are details. Wrapping one behind an interface you own keeps a
vendor migration — and a declined-payment test — a one-line change at the composition root.
