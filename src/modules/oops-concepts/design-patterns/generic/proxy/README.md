# Proxy — Generic

Full theory, the four proxy kinds and interview questions:
[`../../backend/proxy/README.md`](../../backend/proxy/README.md)

The classic framing: charging a card is expensive and irreversible, so the request must go through
an authorization check first. A **protection proxy** wraps the real payment service and enforces
that check without the real service having to know anything about roles.

| Example | Scenario |
| --- | --- |
| `example1` | An `AuthorizedPayment` proxy in front of a `RealPayment` service |
| `example2` | A virtual `LazyPlateReader` that boots the ANPR camera on first use |
