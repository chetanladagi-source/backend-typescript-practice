// Adapter (generic) — Example 1: fit a legacy payment gateway
// into the app's modern PaymentProcessor interface.

// What the app WANTS to talk to. Everything else — repositories, invoices, retries —
// is written against this interface.
export interface PaymentProcessor {
  charge(amount: number, currency: string, description: string): PaymentResult;
}

export interface PaymentResult {
  ok: boolean;
  transactionId: string;
  error?: string;
}

// The modern gateway happens to match the shape already.
class StripeProcessor implements PaymentProcessor {
  public charge(amount: number, currency: string, description: string): PaymentResult {
    return { ok: true, transactionId: `stripe_${Date.now()}`, error: undefined };
  }
}

// The legacy gateway that we cannot change. Wrong method name, wrong argument order,
// wrong result shape — an amount in the smallest unit (paise) instead of rupees.
class LegacyGateway {
  public doPayment(request: { paise: number; curr: string; memo: string }): {
    status: "SUCCESS" | "DECLINED";
    ref: string;
    reason?: string;
  } {
    if (request.paise > 100_000_00) {
      return { status: "DECLINED", ref: "", reason: "exceeds legacy limit" };
    }
    return { status: "SUCCESS", ref: `legacy_${Date.now()}` };
  }
}

// THE ADAPTER. It implements the target interface and holds the adaptee.
// Nothing else in the app knows LegacyGateway exists.
export class LegacyGatewayAdapter implements PaymentProcessor {
  constructor(private readonly legacy: LegacyGateway) {}

  public charge(amount: number, currency: string, description: string): PaymentResult {
    // Translate the modern call into the legacy shape.
    const result = this.legacy.doPayment({
      paise: Math.round(amount * 100), // unit conversion happens here
      curr: currency,
      memo: description,
    });
    // Translate the legacy response into the modern shape.
    return {
      ok: result.status === "SUCCESS",
      transactionId: result.ref,
      error: result.reason,
    };
  }
}

// ---- Demo ----

// The rest of the app: uniform, doesn't care which gateway it got.
function runInvoice(processor: PaymentProcessor, amount: number, description: string): void {
  const result: PaymentResult = processor.charge(amount, "INR", description);
  console.log(
    result.ok
      ? `  paid Rs.${amount} — txn ${result.transactionId}`
      : `  failed Rs.${amount} — ${result.error ?? "unknown"}`,
  );
}

console.log("via modern gateway:");
runInvoice(new StripeProcessor(), 500, "monthly subscription");

console.log("\nvia legacy gateway (wrapped):");
const legacy: PaymentProcessor = new LegacyGatewayAdapter(new LegacyGateway());
runInvoice(legacy, 500, "monthly subscription");
runInvoice(legacy, 200_000, "annual plan"); // above legacy's limit

// The point: runInvoice() is IDENTICAL for both. All the mess lives in the adapter.
