# Example 2 — Parking fee strategies

**Problem:** the same stay can be priced hourly, with a daily cap, or as an early-bird flat rate.
A growing `if (pricing === ...)` inside `checkout()` is how lots end up with untestable pricing.

**Pattern:** `FeeStrategy` with `calculate(hours)`. `ParkingSession` holds one and can swap it
when the lot changes mode (weekday → weekend). Adding "EV discount" is one class.

**Strategy vs State:** the session does not change the strategy by itself — the lot (the caller)
injects the next one. States would swap themselves. Same object shape, different owner of the
transition. Example 1's payment methods are the same idea at the till.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/strategy/example2/index.ts`
