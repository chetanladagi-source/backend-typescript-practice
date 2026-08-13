// Test double for `PaymentGateway` with a scriptable outcome.

import { PaymentGateway, PaymentResult } from "./payment-gateway";

export class FakePaymentGateway implements PaymentGateway {
  private readonly charges: number[] = [];

  constructor(private readonly alwaysApprove: boolean) {}

  public charge(amountInCents: number, currency: string): PaymentResult {
    this.charges.push(amountInCents);
    console.log(`[fake-gateway] recorded ${amountInCents} ${currency}`);
    return { reference: `fake_${this.charges.length}`, approved: this.alwaysApprove };
  }

  public chargedTotal(): number {
    return this.charges.reduce((sum: number, value: number) => sum + value, 0);
  }
}
