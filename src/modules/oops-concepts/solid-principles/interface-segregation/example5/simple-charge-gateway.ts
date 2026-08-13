// Provider that only promises to charge cards.

import { ChargeProcessor } from "./charge-processor";

export class SimpleChargeGateway implements ChargeProcessor {
  public charge(amountCents: number, card: string): string {
    const chargeId: string = `ch_simple_${amountCents}`;
    console.log("[simple-gateway] charged", amountCents, "cents to", card, "->", chargeId);
    return chargeId;
  }
}
