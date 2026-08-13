# Example 4 — Order processing

**Scenario:** process an order: validate it, calculate the payable price, persist it, notify the
customer.

**Violation:** `OrderGod` bundles input rules, the discount policy, the database write and the SMS
gateway. The bulk-discount threshold is a magic number buried between an `if` on quantities and a
`console.log`, so changing pricing risks breaking validation.

**Refactor:** `OrderValidator`, `OrderPriceCalculator`, `OrderRepository` and `CustomerNotifier`
each hold one concern, injected into `OrderProcessingService`.

**Takeaway:** business policy (pricing) changes on a different schedule than infrastructure
(storage, SMS). Different change rates are a strong hint you have two classes, not one.
