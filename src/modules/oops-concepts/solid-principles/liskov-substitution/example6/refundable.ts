// Refunding is a separate capability from paying.

import { PaymentMethod } from "./payment-method";

export interface Refundable extends PaymentMethod {
  refund(reference: string): number;
}

export function isRefundable(payment: PaymentMethod): payment is Refundable {
  return typeof (payment as Refundable).refund === "function";
}
