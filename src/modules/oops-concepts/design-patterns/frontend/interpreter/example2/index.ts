// Interpreter (frontend) — Example 2: conditional field visibility.
// Rules like `country == "IN" && amount > 50000` are authored in an admin panel,
// so they must be interpreted, never eval'd.

type Context = Record<string, string | number | boolean>;

export interface Expr {
  evaluate(context: Context): boolean;
  explain(): string;
}

// Terminal: compare a field against a literal.
class Comparison implements Expr {
  constructor(
    private readonly field: string,
    private readonly op: string,
    private readonly literal: string | number | boolean,
  ) {}

  public evaluate(context: Context): boolean {
    const actual: string | number | boolean | undefined = context[this.field];
    switch (this.op) {
      case "==":
        return actual === this.literal;
      case "!=":
        return actual !== this.literal;
      case ">":
        return Number(actual) > Number(this.literal);
      case "<":
        return Number(actual) < Number(this.literal);
      default:
        throw new Error(`unknown operator "${this.op}"`);
    }
  }

  public explain(): string {
    return `${this.field} ${this.op} ${JSON.stringify(this.literal)}`;
  }
}

// Non-terminals.
class And implements Expr {
  constructor(private readonly parts: Expr[]) {}
  public evaluate(context: Context): boolean {
    return this.parts.every((p: Expr): boolean => p.evaluate(context));
  }
  public explain(): string {
    return this.parts.map((p: Expr): string => p.explain()).join(" AND ");
  }
}

class Or implements Expr {
  constructor(private readonly parts: Expr[]) {}
  public evaluate(context: Context): boolean {
    return this.parts.some((p: Expr): boolean => p.evaluate(context));
  }
  public explain(): string {
    return `(${this.parts.map((p: Expr): string => p.explain()).join(" OR ")})`;
  }
}

// Parser. Precedence is handled by splitting on || first, then &&.
export function parse(source: string): Expr {
  const orParts: string[] = source.split("||");
  if (orParts.length > 1) {
    return new Or(orParts.map(parse));
  }
  const andParts: string[] = source.split("&&");
  if (andParts.length > 1) {
    return new And(andParts.map(parse));
  }
  const match: RegExpMatchArray | null = source.trim().match(/^(\w+)\s*(==|!=|>|<)\s*(.+)$/);
  if (match === null) {
    throw new Error(`cannot parse "${source.trim()}"`);
  }
  const [, field, op, rawLiteral] = match as unknown as [string, string, string, string];
  return new Comparison(field, op, literalOf(rawLiteral.trim()));
}

function literalOf(raw: string): string | number | boolean {
  if (raw === "true" || raw === "false") {
    return raw === "true";
  }
  if (raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1);
  }
  return Number(raw);
}

// ---- Demo ----

// Straight out of an admin panel's "show this field when..." box.
const fields: { name: string; showWhen: string }[] = [
  { name: "gstin", showWhen: 'country == "IN" && isBusiness == true' },
  { name: "stateTax", showWhen: 'country == "US" || country == "CA"' },
  { name: "complianceDocs", showWhen: "amount > 50000" },
  { name: "referralCode", showWhen: 'channel != "organic"' },
];

function renderForm(label: string, context: Context): void {
  console.log(`\n${label}: ${JSON.stringify(context)}`);
  fields.forEach((f): void => {
    const expr: Expr = parse(f.showWhen);
    const visible: boolean = expr.evaluate(context);
    console.log(`  ${visible ? "show" : "hide"}  ${f.name.padEnd(16)} when ${expr.explain()}`);
  });
}

renderForm("Indian business, large order", {
  country: "IN",
  isBusiness: true,
  amount: 75000,
  channel: "ads",
});

renderForm("US individual, small order", {
  country: "US",
  isBusiness: false,
  amount: 900,
  channel: "organic",
});

console.log("\na malformed rule is rejected, not executed:");
try {
  parse("country = IN");
} catch (err) {
  console.log(`  ${(err as Error).message}`);
}
