// Interpreter (generic) — Example 2: parking access rules from a string
// ("kind == \"ev\" && hours < 3") so ops can change policy without a deploy.

interface Stay {
  plate: string;
  kind: string;
  hours: number;
  reserved: boolean;
}

export interface Rule {
  evaluate(stay: Stay): boolean;
  describe(): string;
}

class Comparison implements Rule {
  constructor(
    private readonly field: keyof Stay,
    private readonly op: "==" | "!=" | ">" | "<" | ">=" | "<=",
    private readonly literal: string | number | boolean,
  ) {}

  public evaluate(stay: Stay): boolean {
    const actual: string | number | boolean = stay[this.field];
    switch (this.op) {
      case "==":
        return actual === this.literal;
      case "!=":
        return actual !== this.literal;
      case ">":
        return Number(actual) > Number(this.literal);
      case "<":
        return Number(actual) < Number(this.literal);
      case ">=":
        return Number(actual) >= Number(this.literal);
      case "<=":
        return Number(actual) <= Number(this.literal);
    }
  }

  public describe(): string {
    return `${this.field} ${this.op} ${JSON.stringify(this.literal)}`;
  }
}

class And implements Rule {
  constructor(private readonly parts: Rule[]) {}
  public evaluate(stay: Stay): boolean {
    return this.parts.every((p: Rule): boolean => p.evaluate(stay));
  }
  public describe(): string {
    return this.parts.map((p: Rule): string => p.describe()).join(" AND ");
  }
}

class Or implements Rule {
  constructor(private readonly parts: Rule[]) {}
  public evaluate(stay: Stay): boolean {
    return this.parts.some((p: Rule): boolean => p.evaluate(stay));
  }
  public describe(): string {
    return `(${this.parts.map((p: Rule): string => p.describe()).join(" OR ")})`;
  }
}

export function parse(source: string): Rule {
  const orParts: string[] = source.split("||");
  if (orParts.length > 1) {
    return new Or(orParts.map(parse));
  }
  const andParts: string[] = source.split("&&");
  if (andParts.length > 1) {
    return new And(andParts.map(parse));
  }
  const match: RegExpMatchArray | null = source.trim().match(/^(\w+)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
  if (match === null) {
    throw new Error(`cannot parse "${source.trim()}"`);
  }
  const [, field, op, raw] = match as unknown as [string, string, string, string];
  const trimmed: string = raw.trim();
  let literal: string | number | boolean;
  if (trimmed === "true" || trimmed === "false") {
    literal = trimmed === "true";
  } else if (trimmed.startsWith('"')) {
    literal = trimmed.slice(1, -1);
  } else {
    literal = Number(trimmed);
  }
  return new Comparison(field as keyof Stay, op as "==" | "!=" | ">" | "<" | ">=" | "<=", literal);
}

// ---- Demo ----

const stays: Stay[] = [
  { plate: "KA-01-EV01", kind: "ev", hours: 2, reserved: false },
  { plate: "KA-01-1111", kind: "sedan", hours: 5, reserved: true },
  { plate: "KA-01-2222", kind: "sedan", hours: 1, reserved: false },
];

function apply(policy: string): void {
  const rule: Rule = parse(policy);
  console.log(`\nfree parking when ${rule.describe()}`);
  stays.forEach((s: Stay): void => {
    console.log(`  ${s.plate.padEnd(12)} ${rule.evaluate(s) ? "FREE" : "pay"}`);
  });
}

apply('kind == "ev" && hours < 3');
apply("reserved == true || hours <= 1");

try {
  parse("kind = ev");
} catch (err) {
  console.log("\nmalformed policy:", (err as Error).message);
}
