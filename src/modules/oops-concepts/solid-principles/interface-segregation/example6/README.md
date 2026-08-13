# Example 6 — Smart home devices

**Scenario:** One `SmartDevice` interface covers `turnOn`/`turnOff` plus brightness, temperature
and volume, so a smart plug that just switches mains power inherits three irrelevant dials.

**Dead weight:** `setBrightness` and `setTemperature` throw on `SmartPlugViolation`, and
`setVolume` is an empty no-op.

**Fix:** Keep `Switchable` as the shared contract and put `Dimmable` and `TemperatureAdjustable`
in their own. The plug implements one contract, the bulb and thermostat add only what they own.

**Takeaway:** A hub can iterate `Switchable[]` to power everything, then narrow to `Dimmable` only
for devices that actually have a lamp.
