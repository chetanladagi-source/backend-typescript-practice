// Bridge — Example 3: payment kinds × gateways.
// A one-time charge and a subscription are different workflows; Stripe and Razorpay
// are different plumbing. Neither should force the other to grow.

// --- Implementor: the gateway plumbing ---
export interface Gateway {
  authorize(amount: number, token: string): string;
  capture(authId: string): string;
  scheduleRecurring(amount: number, token: string, everyDays: number): string;
}

class StripeGateway implements Gateway {
  public authorize(amount: number, token: string): string {
    console.log(`  [stripe] authorize Rs.${amount} with ${token}`);
    return "auth_stripe_1";
  }
  public capture(authId: string): string {
    console.log(`  [stripe] capture ${authId}`);
    return "ch_stripe_1";
  }
  public scheduleRecurring(amount: number, token: string, everyDays: number): string {
    console.log(`  [stripe] subscription Rs.${amount} every ${everyDays}d`);
    return "sub_stripe_1";
  }
}

class RazorpayGateway implements Gateway {
  public authorize(amount: number, token: string): string {
    console.log(`  [razorpay] create order Rs.${amount} (${token})`);
    return "order_rzp_1";
  }
  public capture(authId: string): string {
    console.log(`  [razorpay] capture ${authId}`);
    return "pay_rzp_1";
  }
  public scheduleRecurring(amount: number, token: string, everyDays: number): string {
    console.log(`  [razorpay] mandate Rs.${amount} / ${everyDays}d`);
    return "sub_rzp_1";
  }
}

// --- Abstraction: the payment workflow ---
export abstract class Payment {
  constructor(protected readonly gateway: Gateway) {}

  public abstract process(amount: number, token: string): string;
}

class OneTimePayment extends Payment {
  public process(amount: number, token: string): string {
    const authId: string = this.gateway.authorize(amount, token);
    return this.gateway.capture(authId);
  }
}

class SubscriptionPayment extends Payment {
  constructor(gateway: Gateway, private readonly everyDays: number) {
    super(gateway);
  }

  public process(amount: number, token: string): string {
    // First cycle is charged immediately, then the mandate is set up.
    this.gateway.capture(this.gateway.authorize(amount, token));
    return this.gateway.scheduleRecurring(amount, token, this.everyDays);
  }
}

class PreAuthPayment extends Payment {
  // Hotels and rentals: hold funds now, capture later.
  public process(amount: number, token: string): string {
    return this.gateway.authorize(amount, token);
  }
}

// ---- Demo ----

const payments: Payment[] = [
  new OneTimePayment(new StripeGateway()),
  new OneTimePayment(new RazorpayGateway()),
  new SubscriptionPayment(new StripeGateway(), 30),
  new PreAuthPayment(new RazorpayGateway()),
];

payments.forEach((p: Payment): void => {
  console.log("=>", p.process(4999, "tok_visa"), "\n");
});
