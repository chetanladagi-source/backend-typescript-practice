# Example 4 - FixedDepositAccount extends BankAccount

**Scenario:** A bill payment routine debits any `BankAccount` passed to it.

**Broken contract:** `BankAccount.withdraw()` promises to debit the account whenever the amount is affordable, throwing only on insufficient funds. `FixedDepositAccount` throws unconditionally, strengthening the precondition to "never", so the bill payment fails for a subtype the compiler accepted.

**Fix:** `Account` keeps deposit and balance queries. Withdrawal moves to a `WithdrawableAccount` capability that `SavingsAccount` implements; the fixed deposit exposes `projectedMaturityValue()` instead, and the payment service demands the withdrawable type.

**Takeaway:** Subtypes may not strengthen preconditions. If an operation is unavailable for a whole family of types, remove it from the shared base rather than overriding it with a throw.
