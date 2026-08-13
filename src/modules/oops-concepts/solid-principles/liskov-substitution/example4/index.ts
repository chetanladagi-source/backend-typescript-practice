// Runnable entry point: violating design first, then the LSP-compliant design.

import { BankAccount, FixedDepositAccount as BadFixedDeposit, payUtilityBill as badPayUtilityBill } from "./bank-account-violation";
import { SavingsAccount } from "./savings-account";
import { FixedDepositAccount } from "./fixed-deposit-account";
import { tryPayFromAny } from "./bill-payment-service";

export function run(): void {
  console.log("=== Violation ===");
  console.log(`Remaining balance: ${badPayUtilityBill(new BankAccount("SB-100", 5000), 1200)}`);
  try {
    console.log(`Remaining balance: ${badPayUtilityBill(new BadFixedDeposit("FD-200", 5000), 1200)}`);
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  tryPayFromAny(new SavingsAccount("SB-100", 5000), 1200);
  const deposit: FixedDepositAccount = new FixedDepositAccount("FD-200", 5000, 2029);
  tryPayFromAny(deposit, 1200);
  console.log(`FD-200 matures in ${deposit.maturityYear} at ${deposit.projectedMaturityValue()}`);
}

run();
