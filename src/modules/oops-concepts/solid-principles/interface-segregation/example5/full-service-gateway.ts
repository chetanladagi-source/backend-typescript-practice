// Provider that really supports every payment capability.

import { ChargeProcessor } from "./charge-processor";
import { PayoutProcessor, SubscriptionManager } from "./payout-and-subscription";
import { RefundProcessor } from "./refund-processor";

export class FullServiceGateway
  implements ChargeProcessor, RefundProcessor, SubscriptionManager, PayoutProcessor
{
  public charge(amountCents: number, card: string): string {
    const chargeId: string = `ch_full_${amountCents}`;
    console.log("[full-gateway] charged", amountCents, "cents to", card, "->", chargeId);
    return chargeId;
  }

  public refund(chargeId: string, amountCents: number): void {
    console.log("[full-gateway] refunded", amountCents, "cents on", chargeId);
  }

  public subscribe(customerId: string, planId: string): string {
    const subscriptionId: string = `sub_${customerId}_${planId}`;
    console.log("[full-gateway] subscribed", customerId, "->", subscriptionId);
    return subscriptionId;
  }

  public payout(accountId: string, amountCents: number): void {
    console.log("[full-gateway] paid out", amountCents, "cents to", accountId);
  }
}
