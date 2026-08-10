// src/payment/CreditCardPayment.ts

import { Payment } from "./Payment";
import { PaymentType } from "./PaymentTypes";

export class CreditCardPayment extends Payment implements PaymentType {
  type = "Credit";
  override pay(amount: number): void {
    console.log(`Paying ₹${amount} using Credit Card`);
  }

  addType(type: string): void {
    this.type = type;
    console.log(`Paying ₹${this.type} using Credit Card`);
  }
}
