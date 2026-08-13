// Runnable entry point: violating design first, then the LSP-compliant design.

import { OnlinePayment, CashPayment as BadCashPayment, reverseOrder as badReverseOrder } from "./payment-violation";
import { CardPayment } from "./card-payment";
import { CashPayment } from "./cash-payment";
import { reverseOrder } from "./refund-service";

export function run(): void {
  console.log("=== Violation ===");
  const online: OnlinePayment = new OnlinePayment("CardGateway");
  online.pay("ORD-1", 2500);
  console.log(`Refunded: ${badReverseOrder(online, "ORD-1")}`);

  const cash: BadCashPayment = new BadCashPayment("CounterCash");
  cash.pay("ORD-2", 900);
  try {
    console.log(`Refunded: ${badReverseOrder(cash, "ORD-2")}`);
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  const card: CardPayment = new CardPayment();
  card.pay("ORD-1", 2500);
  console.log(`Refunded: ${reverseOrder(card, "ORD-1")}`);

  const counter: CashPayment = new CashPayment();
  counter.pay("ORD-2", 900);
  console.log(counter.issueCreditNote("ORD-2", 900));
}

run();
