// High-level policy: checkout steps emit events through `AnalyticsTracker`.

import { AnalyticsTracker } from "./analytics-tracker";

export class CheckoutService {
  constructor(private readonly tracker: AnalyticsTracker) {}

  public startCheckout(cartId: string, itemCount: number): void {
    this.tracker.track("checkout_started", { cartId, itemCount });
    console.log("[checkout] started for", cartId);
  }

  public completeCheckout(cartId: string, totalInCents: number): void {
    this.tracker.track("checkout_completed", { cartId, totalInCents });
    console.log("[checkout] completed for", cartId);
  }
}
