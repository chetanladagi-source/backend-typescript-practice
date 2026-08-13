// Consumer that requires the refund capability explicitly.

import { Refundable } from "./refundable";

export function reverseOrder(payment: Refundable, reference: string): number {
  console.log(`Reversing ${reference} via ${payment.gateway}`);
  return payment.refund(reference);
}
