# Example 8 — Checkout telemetry

**Scenario:** `CheckoutService` emits a started and a completed event around the purchase flow.

**Before:** the arrow pointed `CheckoutService -> GoogleAnalyticsBeacon`. Tests polluted real
dashboards and a user who opted out of tracking could not be served.

**After:** the service depends on the `AnalyticsTracker` interface. `GoogleAnalyticsTracker` sends
beacons; `NoOpTracker` swallows them.

**Takeaway:** a no-op implementation is the cheapest proof that a dependency is truly inverted —
turning a whole subsystem off becomes a constructor argument.
