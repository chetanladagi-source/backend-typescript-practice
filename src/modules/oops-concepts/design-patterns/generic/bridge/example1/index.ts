// Bridge (generic) — Example 1: split the "what" from the "how".
// Payment KIND (one-off, subscription, refund) is the abstraction.
// Payment GATEWAY (Stripe, Razorpay, PayPal) is the implementation.

// The IMPLEMENTATION side. All gateways implement this.
export interface PaymentGateway {
  readonly name: string;
  charge(amount: number, ref: string): void;
  cancel(ref: string): void;
}

class StripeGateway implements PaymentGateway {
  public readonly name: string = "Stripe";
  public charge(amount: number, ref: string): void {
    console.log(`    [Stripe] POST /charges { amount: ${amount}, ref: "${ref}" }`);
  }
  public cancel(ref: string): void {
    console.log(`    [Stripe] POST /refunds { ref: "${ref}" }`);
  }
}

class RazorpayGateway implements PaymentGateway {
  public readonly name: string = "Razorpay";
  public charge(amount: number, ref: string): void {
    console.log(`    [Razorpay] orders.create({ amount: ${amount * 100}, receipt: "${ref}" })`);
  }
  public cancel(ref: string): void {
    console.log(`    [Razorpay] refunds.create({ payment_id: "${ref}" })`);
  }
}

class PayPalGateway implements PaymentGateway {
  public readonly name: string = "PayPal";
  public charge(amount: number, ref: string): void {
    console.log(`    [PayPal] createOrder(amount=${amount}, invoice="${ref}")`);
  }
  public cancel(ref: string): void {
    console.log(`    [PayPal] captureRefund("${ref}")`);
  }
}

// The ABSTRACTION side. Every kind holds a gateway by reference — that reference IS the bridge.
export abstract class Payment {
  constructor(protected readonly gateway: PaymentGateway) {}
  public abstract execute(amount: number, ref: string): void;
}

class OneOffPayment extends Payment {
  public execute(amount: number, ref: string): void {
    console.log(`  one-off Rs.${amount} via ${this.gateway.name}`);
    this.gateway.charge(amount, ref);
  }
}

class SubscriptionPayment extends Payment {
  public execute(amount: number, ref: string): void {
    console.log(`  subscription Rs.${amount}/mo via ${this.gateway.name}`);
    // A subscription is really a scheduled sequence of charges — model that as two calls.
    this.gateway.charge(amount, `${ref}-m1`);
    this.gateway.charge(amount, `${ref}-m2`);
  }
}

class RefundPayment extends Payment {
  public execute(amount: number, ref: string): void {
    console.log(`  refund Rs.${amount} via ${this.gateway.name}`);
    this.gateway.cancel(ref);
  }
}

// ---- Demo ----

// Any of the 3 kinds composes with any of the 3 gateways. Nine combinations, six classes.
new OneOffPayment(new StripeGateway()).execute(500, "ORD-1");
new SubscriptionPayment(new RazorpayGateway()).execute(299, "SUB-1");
new RefundPayment(new PayPalGateway()).execute(200, "PAY-42");

// Adding a fourth gateway (Braintree) would be ONE new class and zero edits to the kinds.
// Adding a fourth kind (Split-payment) would be ONE new class and zero edits to the gateways.
// The M+N growth is the whole reason the pattern exists.
