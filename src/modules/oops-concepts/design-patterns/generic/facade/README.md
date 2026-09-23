# Facade — Generic

Full theory and interview questions:
[`../../backend/facade/README.md`](../../backend/facade/README.md)

The classic framing: "place an order" behind the scenes is inventory reservation, payment
authorization, shipping label, and email confirmation. Every controller that needs to sell
something would otherwise have to orchestrate all four in the correct order.

| Example | Scenario |
| --- | --- |
| `example1` | `CheckoutFacade.placeOrder(...)` over payment, inventory, shipping and email |
