// The one capability every payment provider has.

export interface ChargeProcessor {
  charge(amountCents: number, card: string): string;
}
