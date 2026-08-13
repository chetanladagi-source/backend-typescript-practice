# Example 1 - Square extends Rectangle

**Scenario:** A drawing tool resizes shapes through a `Rectangle` base type and expects `setWidth(5)` + `setHeight(4)` to produce an area of 20.

**Broken contract:** `Rectangle` guarantees that width and height are independent dimensions. `Square` overrides both setters so that each one mutates the other, so the postcondition `area === width * height` no longer holds for the values the caller set. Substituting a `Square` silently returns 16 instead of 20.

**Fix:** Stop pretending a square is a rectangle. Both implement a small `Shape` interface exposing only `getArea()`, and resizing produces a new immutable instance instead of mutating shared dimensions.

**Takeaway:** Inheritance must preserve the base type's behavioural guarantees, not just its method names. When a subtype cannot honour a setter's postcondition, model it as a sibling behind a narrower abstraction.
