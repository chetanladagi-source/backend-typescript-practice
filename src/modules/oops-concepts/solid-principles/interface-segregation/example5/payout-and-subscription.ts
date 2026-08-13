// Contracts only full-service providers can honour.

export interface SubscriptionManager {
  subscribe(customerId: string, planId: string): string;
}

export interface PayoutProcessor {
  payout(accountId: string, amountCents: number): void;
}
