# Singleton — Generic

Full theory, testability traps and interview questions:
[`../../backend/singleton/README.md`](../../backend/singleton/README.md)

The classic textbook framing: a parking lot has exactly one instance for the whole building, and
every entry gate, exit gate and display board must see the same occupancy count.

| Example | Scenario |
| --- | --- |
| `example1` | `ParkingLot.getInstance()` guarantees one shared instance |
| `example2` | One `CashDrawer` for the whole coffee shop, plus `resetForTests()` |
