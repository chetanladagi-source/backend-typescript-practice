// Refund capability only.

export interface RefundProcessor {
  refund(chargeId: string, amountCents: number): void;
}
