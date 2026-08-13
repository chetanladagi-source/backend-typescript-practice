// Production implementation of `PaymentGateway`; the HTTP call is simulated.

import { PaymentGateway, PaymentResult } from "./payment-gateway";

export class StripeGateway implements PaymentGateway {
  private nextId: number = 1;

  public charge(amountInCents: number, currency: string): PaymentResult {
    const reference: string = `stripe_ch_${this.nextId}`;
    this.nextId += 1;
    console.log(`[stripe] POST /v1/charges ${amountInCents} ${currency}`);
    return { reference, approved: amountInCents <= 100_000 };
  }
}
