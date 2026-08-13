# Example 5 — Payment gateways

**Scenario:** A single `PaymentGateway` interface requires `charge`, `refund`, `subscribe` and
`payout`, so a minimal card processor must pretend to offer the full product suite.

**Dead weight:** `refund` and `subscribe` throw on `SimpleGatewayViolation`, and `payout` is a
silent no-op — the worst case, because callers believe money moved.

**Fix:** Split into `ChargeProcessor`, `RefundProcessor`, `SubscriptionManager` and
`PayoutProcessor`. `SimpleChargeGateway` implements one; `FullServiceGateway` implements all four.

**Takeaway:** The checkout flow only needs `ChargeProcessor`, so swapping in a minimal provider
should not require stubbing features nobody calls.
