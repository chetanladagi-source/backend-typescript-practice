// Factory Method — Example 2: payment gateways, using real inheritance-based
// Factory Method (a creator subclass overrides the factory method) rather than a switch.

export interface PaymentGateway {
  charge(amountInPaise: number, currency: string): string;
}

class StripeGateway implements PaymentGateway {
  public charge(amountInPaise: number, currency: string): string {
    return `[stripe] charged ${amountInPaise / 100} ${currency}, id=ch_${Date.now()}`;
  }
}

class RazorpayGateway implements PaymentGateway {
  public charge(amountInPaise: number, currency: string): string {
    return `[razorpay] captured ${amountInPaise / 100} ${currency}, id=pay_abc`;
  }
}

class PaypalGateway implements PaymentGateway {
  public charge(amountInPaise: number, currency: string): string {
    return `[paypal] payment of ${amountInPaise / 100} ${currency} completed`;
  }
}

// The creator. It contains the shared workflow and defers *which* gateway to subclasses.
abstract class CheckoutService {
  // This is the factory method.
  protected abstract createGateway(): PaymentGateway;

  // Template of shared behaviour; identical for every gateway.
  public checkout(orderId: string, amountInPaise: number): void {
    console.log(`--- checkout ${orderId} ---`);
    const gateway: PaymentGateway = this.createGateway();
    console.log(gateway.charge(amountInPaise, "INR"));
    console.log(`order ${orderId} marked paid`);
  }
}

class IndiaCheckout extends CheckoutService {
  protected createGateway(): PaymentGateway {
    return new RazorpayGateway();
  }
}

class UsCheckout extends CheckoutService {
  protected createGateway(): PaymentGateway {
    return new StripeGateway();
  }
}

class LegacyCheckout extends CheckoutService {
  protected createGateway(): PaymentGateway {
    return new PaypalGateway();
  }
}

// ---- Demo ----

const checkouts: CheckoutService[] = [new IndiaCheckout(), new UsCheckout(), new LegacyCheckout()];

checkouts.forEach((service: CheckoutService, i: number): void => {
  service.checkout(`ORD-${100 + i}`, 249900);
});
