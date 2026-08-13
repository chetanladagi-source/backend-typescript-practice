# Example 10 — Shopping cart

**Scenario:** check out a cart: sum the lines, apply a coupon, charge the card.

**Violation:** `CartGod` is a container that also knows the coupon catalogue and the payment gateway.
Every marketing promotion edits `checkout()`, and testing the item math requires a fake card charge.

**Refactor:** `ShoppingCart` only holds items, `CartTotalsCalculator` sums them, `DiscountPolicy`
owns promotions, `PaymentProcessor` owns the gateway, and `CheckoutService` runs the sequence.

**Takeaway:** a collection class should not own the workflow that consumes it. Once discounts live
alone, adding a promotion cannot break the cart or the payment call.
