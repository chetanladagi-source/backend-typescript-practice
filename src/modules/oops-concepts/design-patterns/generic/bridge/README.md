# Bridge — Generic

Full theory, the M+N vs M×N argument and interview questions:
[`../../backend/bridge/README.md`](../../backend/bridge/README.md)

The classic framing: there are three kinds of payment (one-off, subscription, refund) and three
gateways they can run through (Stripe, Razorpay, PayPal). Nine subclasses is the anti-pattern that
Bridge exists to prevent.

| Example | Scenario |
| --- | --- |
| `example1` | Payment kinds × gateways as **3 + 3**, not **3 × 3** |
| `example2` | Drink kinds × brewers (machine / kettle / press) as **3 + 3** |
