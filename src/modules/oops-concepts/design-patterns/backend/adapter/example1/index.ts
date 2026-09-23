// Adapter — Example 1: a legacy payment SDK behind a modern interface.
// We cannot edit the SDK; we wrap it.

// --- Target: what our application wants to depend on ---
export interface PaymentProcessor {
  pay(amountInPaise: number, currency: string): { ok: boolean; reference: string };
}

// --- Adaptee: the vendor's class. Wrong units, wrong names, wrong return shape. ---
class LegacyPaymentSdk {
  // Takes rupees as a string, returns a pipe-delimited status line.
  public doPayment(amountAsString: string, currencyCode: number): string {
    return `STATUS=OK|TXN=LEG-${amountAsString.replace(".", "")}|CCY=${currencyCode}`;
  }
}

// --- Adapter: implements Target, owns an Adaptee, translates both directions. ---
class LegacyPaymentAdapter implements PaymentProcessor {
  private static readonly currencyCodes: Record<string, number> = { INR: 356, USD: 840 };

  constructor(private readonly sdk: LegacyPaymentSdk = new LegacyPaymentSdk()) {}

  public pay(amountInPaise: number, currency: string): { ok: boolean; reference: string } {
    // Translate the request: paise -> rupee string, ISO code -> numeric code.
    const rupees: string = (amountInPaise / 100).toFixed(2);
    const code: number = LegacyPaymentAdapter.currencyCodes[currency] ?? 0;

    const raw: string = this.sdk.doPayment(rupees, code);

    // Translate the response: pipe-delimited string -> our object.
    const parts: Record<string, string> = Object.fromEntries(
      raw.split("|").map((pair: string): [string, string] => {
        const [k, v] = pair.split("=");
        return [k, v];
      }),
    );
    return { ok: parts.STATUS === "OK", reference: parts.TXN };
  }
}

// A modern gateway that already speaks our language needs no adapter.
class StripeProcessor implements PaymentProcessor {
  public pay(amountInPaise: number, currency: string): { ok: boolean; reference: string } {
    return { ok: true, reference: `ch_${amountInPaise}_${currency}` };
  }
}

// Application code: identical for both.
function checkout(processor: PaymentProcessor, amountInPaise: number): void {
  const result = processor.pay(amountInPaise, "INR");
  console.log(result.ok ? `paid, ref=${result.reference}` : "payment failed");
}

// ---- Demo ----

console.log("legacy via adapter:");
checkout(new LegacyPaymentAdapter(), 249900);

console.log("modern, no adapter needed:");
checkout(new StripeProcessor(), 249900);
