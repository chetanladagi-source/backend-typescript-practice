// Decorator (generic) — Example 2: stackable payment-fee wrappers.

export interface Charge {
  describe(): string;
  total(): number;
}

class BaseCharge implements Charge {
  constructor(private readonly amount: number, private readonly label: string) {}
  public describe(): string {
    return this.label;
  }
  public total(): number {
    return this.amount;
  }
}

abstract class FeeDecorator implements Charge {
  constructor(protected readonly inner: Charge) {}
  public abstract describe(): string;
  public abstract total(): number;
}

class Gst extends FeeDecorator {
  public describe(): string {
    return `${this.inner.describe()} + GST 18%`;
  }
  public total(): number {
    return Math.round(this.inner.total() * 1.18);
  }
}

class ConvenienceFee extends FeeDecorator {
  constructor(inner: Charge, private readonly flat: number) {
    super(inner);
  }
  public describe(): string {
    return `${this.inner.describe()} + convenience Rs.${this.flat}`;
  }
  public total(): number {
    return this.inner.total() + this.flat;
  }
}

class InternationalMarkup extends FeeDecorator {
  public describe(): string {
    return `${this.inner.describe()} + FX 3%`;
  }
  public total(): number {
    return Math.round(this.inner.total() * 1.03);
  }
}

// ---- Demo ----

function print(charge: Charge): void {
  console.log(`  ${charge.describe().padEnd(52)} Rs.${charge.total()}`);
}

print(new BaseCharge(1000, "plan"));
print(new Gst(new BaseCharge(1000, "plan")));
print(new ConvenienceFee(new Gst(new BaseCharge(1000, "plan")), 20));

// Order matters for percentages: FX then GST ≠ GST then FX.
const fxThenGst: Charge = new Gst(new InternationalMarkup(new BaseCharge(1000, "plan")));
const gstThenFx: Charge = new InternationalMarkup(new Gst(new BaseCharge(1000, "plan")));
console.log("\nFX then GST:", fxThenGst.total(), "  GST then FX:", gstThenFx.total());
