// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyDiscountService } from "./discount-violation";
import { DiscountStrategy } from "./discount-strategy";
import { RegularDiscount } from "./regular-discount";
import { PremiumDiscount } from "./premium-discount";
import { EmployeeDiscount } from "./employee-discount";
import { CheckoutService } from "./checkout-service";

console.log("=== Violation ===");
const legacy: LegacyDiscountService = new LegacyDiscountService();
for (const type of ["regular", "premium", "employee"]) {
  console.log(`${type} pays ${legacy.finalPrice(type, 2000).toFixed(2)}`);
}

console.log("\n=== OCP applied ===");
const checkout: CheckoutService = new CheckoutService();
const strategies: DiscountStrategy[] = [new RegularDiscount(), new PremiumDiscount()];
for (const strategy of strategies) {
  checkout.checkout(strategy, 2000);
}

console.log("\n=== Extension without modification ===");
checkout.checkout(new EmployeeDiscount(), 2000);
