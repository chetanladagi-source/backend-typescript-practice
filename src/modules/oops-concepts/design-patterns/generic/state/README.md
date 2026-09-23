# State — Generic

Full theory, the State/Strategy distinction and interview questions:
[`../../backend/state/README.md`](../../backend/state/README.md)

The classic framing: a payment goes through discrete states — Initiated, Authorized, Captured,
Refunded, Failed. Illegal transitions (capture an unauthorized payment, refund a failed one) must
be impossible.

| Example | Scenario |
| --- | --- |
| `example1` | Payment lifecycle with one class per state |
