// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyPaymentProcessor } from "./payment-violation";
import { PaymentMethod } from "./payment-method";
import { CreditCardPayment } from "./credit-card-payment";
import { UpiPayment } from "./upi-payment";
import { WalletPayment } from "./wallet-payment";
import { PaymentProcessor } from "./payment-processor";

console.log("=== Violation ===");
const legacy: LegacyPaymentProcessor = new LegacyPaymentProcessor();
legacy.process("credit-card", 1200);
legacy.process("upi", 350);
legacy.process("wallet", 90);

console.log("\n=== OCP applied ===");
const processor: PaymentProcessor = new PaymentProcessor();
const methods: PaymentMethod[] = [
  new CreditCardPayment("4111111111111234"),
  new UpiPayment("chetan@bank"),
];
for (const method of methods) {
  processor.process(method, 500);
}

console.log("\n=== Extension without modification ===");
processor.process(new WalletPayment("WLT-77"), 90);
