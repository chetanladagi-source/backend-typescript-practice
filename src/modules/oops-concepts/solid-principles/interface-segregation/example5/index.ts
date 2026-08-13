// Runnable entry point contrasting the fat PaymentGateway contract with capability contracts.

import { ChargeProcessor } from "./charge-processor";
import { FullServiceGateway } from "./full-service-gateway";
import { PaymentGateway, SimpleGatewayViolation } from "./payment-gateway-violation";
import { PayoutProcessor, SubscriptionManager } from "./payout-and-subscription";
import { RefundProcessor } from "./refund-processor";
import { SimpleChargeGateway } from "./simple-charge-gateway";

console.log("=== Violation ===");
const fatGateway: PaymentGateway = new SimpleGatewayViolation();
const violationChargeId: string = fatGateway.charge(2500, "**** 4242");
try {
  fatGateway.refund(violationChargeId, 2500);
} catch (error) {
  console.log("[violation] refund failed:", (error as Error).message);
}
try {
  fatGateway.subscribe("cus_1", "plan_pro");
} catch (error) {
  console.log("[violation] subscribe failed:", (error as Error).message);
}
fatGateway.payout("acct_1", 1000);

console.log("=== ISP applied ===");
const checkout: ChargeProcessor = new SimpleChargeGateway();
checkout.charge(2500, "**** 4242");

const full: FullServiceGateway = new FullServiceGateway();
const chargeId: string = full.charge(2500, "**** 4242");
const refunds: RefundProcessor = full;
const subscriptions: SubscriptionManager = full;
const payouts: PayoutProcessor = full;
refunds.refund(chargeId, 2500);
subscriptions.subscribe("cus_1", "plan_pro");
payouts.payout("acct_1", 1000);
