// Credit card implementation of PaymentMethod.

import { PaymentMethod } from "./payment-method";

export class CreditCardPayment implements PaymentMethod {
  public readonly name: string = "credit-card";

  public constructor(private readonly cardNumber: string) {}

  public pay(amount: number): void {
    console.log(`Charged ${amount} to card ending ${this.cardNumber.slice(-4)}`);
  }
}
