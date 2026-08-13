# Example 9 — Subscription expiry

**Scenario:** `SubscriptionService` decides how many days are left in a 30-day term.

**Before:** the arrow pointed `SubscriptionServiceViolation -> Date.now()`. Time was an ambient
global, so reaching day 31 required either sleeping or monkey-patching dates.

**After:** the service depends on the `Clock` interface. `SystemClock` reads the machine and
`FixedClock` starts at a chosen instant and only moves when `advanceDays` is called.

**Takeaway:** hidden dependencies are still dependencies. Making the clock an argument turns a
month-long wait into a deterministic assertion.
