// Runnable entry point contrasting the Stripe-bound service with the injected one.

import { FakePaymentGateway } from "./fake-payment-gateway";
import { OrderService } from "./order-service";
import { OrderServiceViolation } from "./order-service-violation";
import { StripeGateway } from "./stripe-gateway";

console.log("=== Violation ===");
const hardWired: OrderServiceViolation = new OrderServiceViolation();
hardWired.placeOrder("ord-1", 4_999);

console.log("=== DIP applied ===");
const production: OrderService = new OrderService(new StripeGateway());
production.placeOrder("ord-1", 4_999);
production.placeOrder("ord-2", 250_000);

const fakeGateway: FakePaymentGateway = new FakePaymentGateway(false);
const underTest: OrderService = new OrderService(fakeGateway);
underTest.placeOrder("ord-3", 1_500);
console.log("[test] receipts:", underTest.receiptCount(), "charged:", fakeGateway.chargedTotal());
