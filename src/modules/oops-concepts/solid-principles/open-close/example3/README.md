# Example 3 - Discount rules

Scenario: an e-commerce cart applies different discounts per customer tier.

Violation: `LegacyDiscountService` hardcodes an if-else chain over customer type.
Marketing invents an "employee" tier and the only way to support it is to reopen
a class that already handles live money, retest every existing branch, and redeploy.

Fix: `DiscountStrategy` exposes `discountFor()`, one class per tier, and
`CheckoutService` just applies whatever strategy it receives.

Takeaway: pricing policy becomes data you pass in, not code you edit. New tiers
arrive as new files.
