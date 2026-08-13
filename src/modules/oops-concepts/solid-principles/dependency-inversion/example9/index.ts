// Runnable entry point contrasting the clock-bound service with the injected one.

import { FixedClock } from "./fixed-clock";
import { LegacySubscription, SubscriptionServiceViolation } from "./subscription-service-violation";
import { Subscription, SubscriptionService } from "./subscription-service";
import { SystemClock } from "./system-clock";

console.log("=== Violation ===");
const hardWired: SubscriptionServiceViolation = new SubscriptionServiceViolation();
const legacy: LegacySubscription = hardWired.subscribe("sub-1");
console.log("[violation] expired:", hardWired.isExpired(legacy));
console.log("[violation] cannot reach day 31 without sleeping for a month");

console.log("=== DIP applied ===");
const production: SubscriptionService = new SubscriptionService(new SystemClock());
const live: Subscription = production.subscribe("sub-1");
console.log("[production] days remaining:", production.daysRemaining(live));

const clock: FixedClock = new FixedClock(Date.UTC(2026, 0, 1));
const underTest: SubscriptionService = new SubscriptionService(clock);
const fixed: Subscription = underTest.subscribe("sub-2");
console.log("[test] days remaining:", underTest.daysRemaining(fixed));
clock.advanceDays(31);
console.log("[test] days remaining:", underTest.daysRemaining(fixed));
console.log("[test] expired:", underTest.isExpired(fixed));
