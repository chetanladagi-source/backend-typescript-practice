# Example 5 - Bicycle extends Vehicle

**Scenario:** A trip service starts the engine of any `Vehicle` and then drives it.

**Broken contract:** `Vehicle.startEngine()` guarantees the postcondition `isEngineRunning() === true`. `Bicycle` overrides it as a silent no-op, so the flag stays false and the trip service detects an inconsistent state. A no-op override is as much a violation as a thrown error, and harder to spot.

**Fix:** `Vehicle` keeps only `drive()`. Ignition moves to a `MotorizedVehicle` interface implemented by `Car`; `Bicycle` exposes `pedal()` instead, and the trip service narrows before touching the engine.

**Takeaway:** Silently doing nothing breaks a postcondition just as badly as throwing. Model capabilities the subtype genuinely has rather than stubbing out inherited behaviour.
