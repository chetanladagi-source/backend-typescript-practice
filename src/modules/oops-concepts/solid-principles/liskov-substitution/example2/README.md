# Example 2 - Penguin extends Bird

**Scenario:** A migration scheduler feeds every bird and then calls `fly()` through the `Bird` base type.

**Broken contract:** `Bird.fly()` promises to return a flight status for any bird. `Penguin` throws instead, adding an exception that the base type never declared, so `sendOnMigration` crashes the moment a penguin is substituted.

**Fix:** `Bird` keeps only universal behaviour (`eat`). Flight moves into a `FlyingBird` capability interface that `Eagle` implements and `Penguin` does not; the scheduler narrows with a type guard and gives penguins a swimming route.

**Takeaway:** A subtype must not throw for operations the base type declares as always available. Push optional behaviour into a separate capability interface instead of inheriting a method you cannot honour.
