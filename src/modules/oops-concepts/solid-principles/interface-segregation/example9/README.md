# Example 9 — Vehicles

**Scenario:** A `Vehicle` interface declares `drive`, `fly` and `sail`, so a family car has to
support air and sea travel just to join the fleet.

**Dead weight:** `fly` and `sail` on `CarViolation`, both throwing. A route planner iterating
`Vehicle[]` has no way to know which legs a given vehicle can handle.

**Fix:** Split into `Drivable`, `Flyable` and `Sailable`. `Car` implements only `Drivable`;
`AmphibiousPlane` implements all three because it truly does all three.

**Takeaway:** Grouping unrelated abilities into one interface forces every implementer down to the
lowest common denominator — segregate and let each type declare its real abilities.
