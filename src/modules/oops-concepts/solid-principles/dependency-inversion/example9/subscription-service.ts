// High-level policy: renewal rules asked of a `Clock` instead of the machine.

import { Clock } from "./clock";

export interface Subscription {
  id: string;
  renewedAt: number;
}

const dayInMs: number = 24 * 60 * 60 * 1_000;
const termInDays: number = 30;

export class SubscriptionService {
  constructor(private readonly clock: Clock) {}

  public subscribe(id: string): Subscription {
    const subscription: Subscription = { id, renewedAt: this.clock.now() };
    console.log("[subscriptions] started", id);
    return subscription;
  }

  public daysRemaining(subscription: Subscription): number {
    const elapsedDays: number = Math.floor((this.clock.now() - subscription.renewedAt) / dayInMs);
    return Math.max(termInDays - elapsedDays, 0);
  }

  public isExpired(subscription: Subscription): boolean {
    return this.daysRemaining(subscription) === 0;
  }
}
