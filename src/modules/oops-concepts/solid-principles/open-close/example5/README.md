# Example 5 - Shipping cost

Scenario: an order is quoted by several courier partners and the cheapest wins.

Violation: `LegacyShippingCalculator` holds every rate formula in one if-else
chain. Onboarding India Post means editing a class that already prices live
shipments, and a typo there breaks the carriers that were working fine.

Fix: `CarrierRate` exposes `quote()`, each partner owns its own formula, and
`ShippingService` compares whatever rate cards it is given.

Takeaway: carriers become a list you can grow at the call site, so the comparison
logic is written once and never reopened.
