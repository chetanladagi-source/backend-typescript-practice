# Flyweight — Generic

Full theory, intrinsic vs extrinsic state and interview questions:
[`../../backend/flyweight/README.md`](../../backend/flyweight/README.md)

The classic framing: a parking lot has 10,000 parked cars, each of one of five vehicle types
(sedan, SUV, motorcycle, ...). If every parked car carries its own copy of the type description,
you store the same string 10,000 times.

| Example | Scenario |
| --- | --- |
| `example1` | Cars share a small pool of `VehicleType` objects; per-car data stays per-car |
