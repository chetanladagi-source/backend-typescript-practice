// Facade (frontend) — Example 2: a useCheckout()-style facade.
// The component gets four values and two actions instead of five collaborators.

// --- The subsystem ---

interface CartLine {
  sku: string;
  title: string;
  unitPrice: number;
  qty: number;
}

class CartStore {
  private readonly lines: CartLine[] = [];

  public add(line: CartLine): void {
    this.lines.push(line);
  }
  public all(): readonly CartLine[] {
    return this.lines;
  }
  public itemCount(): number {
    return this.lines.reduce((n: number, l: CartLine): number => n + l.qty, 0);
  }
}

class PricingService {
  public subtotal(lines: readonly CartLine[]): number {
    return lines.reduce((sum: number, l: CartLine): number => sum + l.unitPrice * l.qty, 0);
  }
  public shipping(subtotal: number): number {
    return subtotal > 5000 ? 0 : 99;
  }
  public tax(subtotal: number): number {
    return Math.round(subtotal * 0.18);
  }
}

class AddressValidator {
  public validate(address: Record<string, string>): string[] {
    return ["line1", "city", "pincode"]
      .filter((f: string): boolean => (address[f] ?? "").trim() === "")
      .map((f: string): string => `${f} is required`);
  }
}

class PaymentSdk {
  public pay(amount: number): { ok: boolean; reference: string } {
    console.log(`  [sdk] charging Rs.${amount}`);
    return { ok: true, reference: "pay_7781" };
  }
}

// --- The facade: the shape a custom hook would return ---
export interface CheckoutView {
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingGap: number;
  errors: string[];
  canSubmit: boolean;
}

export class CheckoutFacade {
  private readonly cart: CartStore = new CartStore();
  private readonly pricing: PricingService = new PricingService();
  private readonly addresses: AddressValidator = new AddressValidator();
  private readonly payments: PaymentSdk = new PaymentSdk();

  private address: Record<string, string> = {};

  public addItem(line: CartLine): void {
    this.cart.add(line);
  }

  public setAddress(address: Record<string, string>): void {
    this.address = address;
  }

  // One derived object, so the component never recomputes totals itself.
  public view(): CheckoutView {
    const lines: readonly CartLine[] = this.cart.all();
    const subtotal: number = this.pricing.subtotal(lines);
    const shipping: number = this.pricing.shipping(subtotal);
    const tax: number = this.pricing.tax(subtotal);
    const errors: string[] = this.addresses.validate(this.address);

    return {
      itemCount: this.cart.itemCount(),
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
      freeShippingGap: Math.max(0, 5001 - subtotal),
      errors,
      canSubmit: lines.length > 0 && errors.length === 0,
    };
  }

  public submit(): string {
    const view: CheckoutView = this.view();
    if (!view.canSubmit) {
      return `cannot submit: ${view.errors.join(", ") || "cart is empty"}`;
    }
    const result = this.payments.pay(view.total);
    return result.ok ? `order placed, ref ${result.reference}` : "payment failed";
  }
}

// ---- Demo ----

const checkout: CheckoutFacade = new CheckoutFacade();

console.log("empty cart, no address:");
console.log(" ", checkout.view());
console.log(" ", checkout.submit());

checkout.addItem({ sku: "p1", title: "Keyboard", unitPrice: 2499, qty: 1 });
console.log("\none item, still no address:");
const v1 = checkout.view();
console.log(`  total Rs.${v1.total}, add Rs.${v1.freeShippingGap} more for free shipping`);
console.log("  errors:", v1.errors);

checkout.setAddress({ line1: "12 MG Road", city: "Bengaluru", pincode: "560001" });
checkout.addItem({ sku: "p2", title: "Monitor", unitPrice: 12999, qty: 1 });

console.log("\ncomplete:");
const v2 = checkout.view();
console.log(`  ${v2.itemCount} items, subtotal Rs.${v2.subtotal}, shipping Rs.${v2.shipping}, tax Rs.${v2.tax}`);
console.log(`  total Rs.${v2.total}, canSubmit=${v2.canSubmit}`);
console.log(" ", checkout.submit());
