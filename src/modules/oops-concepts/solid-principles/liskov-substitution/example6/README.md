# Example 6 - CashPayment extends OnlinePayment

**Scenario:** An order reversal routine refunds a customer through the `OnlinePayment` base type.

**Broken contract:** `OnlinePayment.refund()` promises to return the refunded amount for any captured reference. `CashPayment` inherits that promise and throws instead, so `reverseOrder` fails even though the reference was captured successfully.

**Fix:** `PaymentMethod` covers only `pay()`. `Refundable` adds `refund()` and is implemented by `CardPayment` alone; cash offers `issueCreditNote()` and the refund service accepts only `Refundable`.

**Takeaway:** Reuse of a base class for convenience is not a substitutability argument. Keep optional capabilities such as refunding in their own interface so the compiler stops invalid combinations.
