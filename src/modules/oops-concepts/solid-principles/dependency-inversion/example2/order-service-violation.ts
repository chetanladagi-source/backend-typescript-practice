// Bad design: order rules and the Stripe client are fused together.

class StripeClient {
  private nextId: number = 1;

  public createCharge(amountInCents: number): string {
    const reference: string = `stripe_ch_${this.nextId}`;
    this.nextId += 1;
    console.log(`[stripe] POST /v1/charges ${amountInCents} usd`);
    return reference;
  }
}

export class OrderServiceViolation {
  // VIOLATION: the vendor client is created inside the service, so every test hits the
  // "real" gateway and adding PayPal means rewriting the ordering rules.
  private readonly stripe: StripeClient = new StripeClient();

  public placeOrder(orderId: string, amountInCents: number): string {
    const reference: string = this.stripe.createCharge(amountInCents);
    const receipt: string = `${orderId} paid (${reference})`;
    console.log("[orders]", receipt);
    return receipt;
  }
}
