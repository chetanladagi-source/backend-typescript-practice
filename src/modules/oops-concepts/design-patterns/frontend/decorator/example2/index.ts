// Decorator (frontend) — Example 2: input value transformers.
// Each decorator wraps a formatter and returns a formatter, so they compose.

export interface Formatter {
  format(raw: string): string;
}

// The base: pass the value through unchanged.
class Identity implements Formatter {
  public format(raw: string): string {
    return raw;
  }
}

abstract class FormatterDecorator implements Formatter {
  constructor(protected readonly inner: Formatter) {}
  public abstract format(raw: string): string;
}

class Trim extends FormatterDecorator {
  public format(raw: string): string {
    return this.inner.format(raw).trim();
  }
}

class StripNonDigits extends FormatterDecorator {
  public format(raw: string): string {
    return this.inner.format(raw).replace(/\D/g, "");
  }
}

class MaxLength extends FormatterDecorator {
  constructor(inner: Formatter, private readonly max: number) {
    super(inner);
  }
  public format(raw: string): string {
    return this.inner.format(raw).slice(0, this.max);
  }
}

class GroupEvery extends FormatterDecorator {
  constructor(inner: Formatter, private readonly size: number, private readonly separator: string) {
    super(inner);
  }
  public format(raw: string): string {
    const value: string = this.inner.format(raw);
    const groups: RegExpMatchArray | null = value.match(new RegExp(`.{1,${this.size}}`, "g"));
    return groups === null ? value : groups.join(this.separator);
  }
}

class Uppercase extends FormatterDecorator {
  public format(raw: string): string {
    return this.inner.format(raw).toUpperCase();
  }
}

class MaskAllButLast extends FormatterDecorator {
  constructor(inner: Formatter, private readonly visible: number) {
    super(inner);
  }
  public format(raw: string): string {
    const value: string = this.inner.format(raw);
    const hidden: number = Math.max(0, value.length - this.visible);
    return "\u2022".repeat(hidden) + value.slice(hidden);
  }
}

// ---- Demo ----

// Credit card: digits only, capped at 16, grouped in fours.
const cardNumber: Formatter = new GroupEvery(new MaxLength(new StripNonDigits(new Identity()), 16), 4, " ");
console.log("card input  :", JSON.stringify(cardNumber.format("  4111-abc1 1111 1111 1111999  ")));

// Same pieces, plus masking for a read-only display.
const maskedCard: Formatter = new GroupEvery(
  new MaskAllButLast(new MaxLength(new StripNonDigits(new Identity()), 16), 4),
  4,
  " ",
);
console.log("card display:", JSON.stringify(maskedCard.format("4111111111111111")));

// Coupon code: trimmed and uppercased.
const coupon: Formatter = new Uppercase(new Trim(new Identity()));
console.log("coupon      :", JSON.stringify(coupon.format("  save20  ")));

// Indian phone: digits only, capped at 10, grouped in fives.
const phone: Formatter = new GroupEvery(new MaxLength(new StripNonDigits(new Identity()), 10), 5, " ");
console.log("phone       :", JSON.stringify(phone.format("+91 99999-88888 ext 4")));
