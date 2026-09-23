# Example 1 — ParkingLot as a Singleton

**Problem:** the entry gate, the exit gate, and the display board must all agree on how many spots
are free. Three independent `ParkingLot` instances is the bug that lets two gates hand out the
last spot to two different cars.

**Pattern:** private constructor plus a static `getInstance()`. Everyone who asks gets back the same
object.

**Two details worth calling out in an interview:**

- **Lazy construction.** The instance is built on the first `getInstance()` call, not at class load
  time. If nothing ever asks, nothing is ever built. In a real codebase this matters when the
  singleton opens a database connection.
- **Private constructor.** `new ParkingLot()` from outside the class is a compile-time error, not a
  convention. Without this a second instance is one careless `new` away — the failure mode is
  silent and there is no test that will catch it.

**The point of the demo:** `entryGate`, `exitGate` and `display` are three variable names for the
same object. A `park()` through one is immediately visible to the others, which is the whole reason
the pattern exists.

**Trade-off to volunteer:** Singletons are global state in a friendly disguise, which makes tests
hard (one test's parking lot leaks into the next). Production code usually adds a
`resetForTesting()` escape hatch or replaces the singleton with dependency injection at the top
level.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/singleton/example1/index.ts`
