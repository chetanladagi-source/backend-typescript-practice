# Example 2 - Area calculator

Scenario: a geometry tool computes the area of rectangles, circles and later triangles.

Violation: `LegacyAreaCalculator` switches on `shape.type`, so the shape data
object collects optional fields for every shape and the switch must be reopened
for each new one. The triangle simply falls into the default branch and returns 0.

Fix: a `Shape` interface with `area()`; each shape owns its own formula and
`AreaReport` consumes the abstraction.

Takeaway: `Triangle` is a new file that works immediately, because nothing in the
system asks "which shape is this?" any more.
