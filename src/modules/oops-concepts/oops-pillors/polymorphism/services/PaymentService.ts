import { Payment } from "../payment/Payment";

export function processPayment(payment: Payment, amount: number) {
  payment.pay(amount);
}
