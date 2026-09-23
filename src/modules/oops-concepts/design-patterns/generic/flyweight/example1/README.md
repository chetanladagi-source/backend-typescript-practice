# Example 1 — Shared VehicleType across many cars

**Problem:** 50,000 parked cars each need to know their kind, length and whether they need a
charger. Store that on every car and you have 50,000 copies of the same four strings.

**Pattern:** split the state:

- **Intrinsic** (shared, immutable) — `kind`, `lengthMetres`, `needsCharger`. Lives on `VehicleType`
  and is served by the factory registry, one shared instance per kind.
- **Extrinsic** (per-instance) — `plate`, `spot`, and a *reference* to the shared type. Lives on
  `ParkedCar`.

**Read the demo's output — the numbers are the whole point.** 50,000 cars, four `VehicleType`
objects. The `every` check confirms that all SUVs are the *same* shared instance, not equal copies.

**`Object.freeze` is not decoration.** If any car could mutate its type's `lengthMetres`, it would
mutate the shared object and change every other car with it. Freezing at the point of construction
makes accidental corruption impossible in strict mode — and the demo's last block proves it. This
is the single most likely bug in a hand-written flyweight.

**When Flyweight actually pays off:** the intrinsic part is *large* and *shared* by many
instances. Renderers use it for glyphs, game engines for particle textures, browsers for the
DOM's `computedStyle`. If you are talking about a few hundred instances, `new SmallObject()` is
fine — the pattern's ceremony is worth it at scale, not at boutique.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/flyweight/example1/index.ts`
