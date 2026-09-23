# Adapter — Generic

Full theory and interview questions:
[`../../backend/adapter/README.md`](../../backend/adapter/README.md)

The classic framing: the app has a modern `PaymentProcessor` interface, and a third-party
`LegacyGateway` has a completely different method signature. Rewriting the legacy library is not
an option; wrapping it in an adapter is.

| Example | Scenario |
| --- | --- |
| `example1` | Adapting a legacy payment gateway to the app's `PaymentProcessor` interface |
| `example2` | Adapting a vendor barrier SDK (`setAngle`) to a clean `Gate` |
