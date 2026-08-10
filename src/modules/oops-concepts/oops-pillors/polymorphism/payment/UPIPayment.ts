
import { Payment } from "./Payment";

export class UPIPayment extends Payment {
  override pay(amount: number): void {
    console.log(`Paying ₹${amount} using UPI`);
  }
}