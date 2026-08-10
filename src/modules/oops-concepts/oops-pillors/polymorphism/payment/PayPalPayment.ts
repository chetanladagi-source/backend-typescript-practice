import { Payment } from "./Payment";

export class PayPalPayment extends Payment {
  override pay(amount: number): void {
    console.log(`Paying ₹${amount} using PayPal`);
  }
}