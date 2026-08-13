// UPI implementation of PaymentMethod.

import { PaymentMethod } from "./payment-method";

export class UpiPayment implements PaymentMethod {
  public readonly name: string = "upi";

  public constructor(private readonly vpa: string) {}

  public pay(amount: number): void {
    console.log(`Collected ${amount} from UPI id ${this.vpa}`);
  }
}
