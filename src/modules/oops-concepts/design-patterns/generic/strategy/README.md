# Strategy — Generic

Full theory and interview questions:
[`../../backend/strategy/README.md`](../../backend/strategy/README.md)

The single most-cited example in interviews: at checkout, pick a payment method (Card, UPI,
Wallet). The checkout code should not care which one; each strategy encapsulates its own logic.

| Example | Scenario |
| --- | --- |
| `example1` | A `PaymentStrategy` interchangeable at runtime |
| `example2` | Parking fee strategies: hourly, daily-cap, early-bird |
