// Processor that depends only on the PaymentMethod abstraction.

import { PaymentMethod } from "./payment-method";

export class PaymentProcessor {
  public process(method: PaymentMethod, amount: number): void {
    console.log(`Processing payment via ${method.name}`);
    method.pay(amount);
  }
}
