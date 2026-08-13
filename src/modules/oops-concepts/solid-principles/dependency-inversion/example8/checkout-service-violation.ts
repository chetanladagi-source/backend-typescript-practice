// Bad design: checkout cannot run without firing analytics beacons.

class GoogleAnalyticsBeacon {
  public send(event: string, payload: Record<string, string | number>): void {
    const query: string = Object.entries(payload)
      .map(([key, value]: [string, string | number]) => `${key}=${String(value)}`)
      .join("&");
    console.log(`[ga:G-LEGACY] POST /collect?en=${event}&${query}`);
  }
}

export class CheckoutServiceViolation {
  // VIOLATION: the tracker is built inside checkout, so tests emit real telemetry and a
  // user who opts out of tracking cannot be served at all.
  private readonly beacon: GoogleAnalyticsBeacon = new GoogleAnalyticsBeacon();

  public startCheckout(cartId: string, itemCount: number): void {
    this.beacon.send("checkout_started", { cartId, itemCount });
    console.log("[checkout] started for", cartId);
  }

  public completeCheckout(cartId: string, totalInCents: number): void {
    this.beacon.send("checkout_completed", { cartId, totalInCents });
    console.log("[checkout] completed for", cartId);
  }
}
