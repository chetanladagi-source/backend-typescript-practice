// Runnable entry point contrasting the beacon-bound checkout with the injected one.

import { CheckoutService } from "./checkout-service";
import { CheckoutServiceViolation } from "./checkout-service-violation";
import { GoogleAnalyticsTracker } from "./google-analytics-tracker";
import { NoOpTracker } from "./no-op-tracker";

console.log("=== Violation ===");
const hardWired: CheckoutServiceViolation = new CheckoutServiceViolation();
hardWired.startCheckout("cart-1", 3);
hardWired.completeCheckout("cart-1", 12_400);

console.log("=== DIP applied ===");
const production: CheckoutService = new CheckoutService(new GoogleAnalyticsTracker("G-12345"));
production.startCheckout("cart-1", 3);
production.completeCheckout("cart-1", 12_400);

const silent: NoOpTracker = new NoOpTracker();
const optedOut: CheckoutService = new CheckoutService(silent);
optedOut.startCheckout("cart-2", 1);
optedOut.completeCheckout("cart-2", 3_500);
console.log("[opted-out] events captured but never sent:", silent.seenEvents());
