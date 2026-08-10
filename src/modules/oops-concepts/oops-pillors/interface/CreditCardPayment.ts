import { Payment } from "./Payment";

export class CreditCardPayment implements Payment {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  pay(): void {
    console.log(`Paid ₹${this.amount} using Credit Card`);
  }
}
