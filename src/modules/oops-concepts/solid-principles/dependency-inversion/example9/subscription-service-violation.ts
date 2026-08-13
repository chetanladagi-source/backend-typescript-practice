// Bad design: renewal rules read the machine clock directly.

export interface LegacySubscription {
  id: string;
  renewedAt: number;
}

export class SubscriptionServiceViolation {
  private static readonly dayInMs: number = 24 * 60 * 60 * 1_000;

  public subscribe(id: string): LegacySubscription {
    // VIOLATION: calling `Date.now()` inside the policy makes time an untestable global —
    // an expiry test can only pass by sleeping or by faking dates globally.
    return { id, renewedAt: Date.now() };
  }

  public isExpired(subscription: LegacySubscription): boolean {
    const elapsedDays: number = Math.floor(
      (Date.now() - subscription.renewedAt) / SubscriptionServiceViolation.dayInMs
    );
    return elapsedDays >= 30;
  }
}
