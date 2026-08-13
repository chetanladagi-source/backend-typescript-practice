// Payment method that never advertises refunds.

import { PaymentMethod } from "./payment-method";

export class CashPayment implements PaymentMethod {
  public readonly gateway: string = "CounterCash";

  public pay(reference: string, amount: number): void {
    console.log(`${this.gateway} collected ${amount} for ${reference}`);
  }

  public issueCreditNote(reference: string, amount: number): string {
    return `Credit note for ${reference} worth ${amount}`;
  }
}
