// Interpreter (generic) — Example 1: a saved-search language for employees.

interface Employee {
  name: string;
  role: string;
  salary: number;
  years: number;
}

// One class per grammar rule. Each returns a boolean for a given employee.
export interface Expression {
  evaluate(employee: Employee): boolean;
  describe(): string;
}

// Terminal: a comparison against a literal.
class Comparison implements Expression {
  constructor(
    private readonly field: keyof Employee,
    private readonly op: "==" | "!=" | ">" | "<" | ">=" | "<=",
    private readonly literal: string | number,
  ) {}

  public evaluate(e: Employee): boolean {
    const actual: string | number = e[this.field];
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

// Non-terminals: combine sub-expressions.
class And implements Expression {
  constructor(private readonly parts: Expression[]) {}
  public evaluate(e: Employee): boolean {
    return this.parts.every((p: Expression): boolean => p.evaluate(e));
  }
  public describe(): string {
    return this.parts.map((p: Expression): string => p.describe()).join(" AND ");
  }
}

class Or implements Expression {
  constructor(private readonly parts: Expression[]) {}
  public evaluate(e: Employee): boolean {
    return this.parts.some((p: Expression): boolean => p.evaluate(e));
  }
  public describe(): string {
    return `(${this.parts.map((p: Expression): string => p.describe()).join(" OR ")})`;
  }
}

// A tiny parser. Splits on `||` first, then `&&`, so `&&` binds tighter — no operator
// precedence table needed.
export function parse(source: string): Expression {
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
  const [, field, op, rawLiteral] = match as unknown as [string, string, string, string];
  const literal: string | number = rawLiteral.trim().startsWith('"')
    ? rawLiteral.trim().slice(1, -1)
    : Number(rawLiteral.trim());
  return new Comparison(field as keyof Employee, op as "==" | "!=" | ">" | "<" | ">=" | "<=", literal);
}

// ---- Demo ----

const employees: Employee[] = [
  { name: "Ada", role: "engineer", salary: 120000, years: 4 },
  { name: "Grace", role: "manager", salary: 180000, years: 8 },
  { name: "Linus", role: "engineer", salary: 90000, years: 1 },
  { name: "Radia", role: "manager", salary: 210000, years: 12 },
  { name: "Yves", role: "designer", salary: 105000, years: 6 },
];

function runSavedSearch(query: string): void {
  const expr: Expression = parse(query);
  const matches: Employee[] = employees.filter((e: Employee): boolean => expr.evaluate(e));
  console.log(`\nQ: ${expr.describe()}`);
  matches.forEach((e: Employee): void => console.log(`  ${e.name} (${e.role}, ${e.salary}, ${e.years}y)`));
  if (matches.length === 0) {
    console.log("  (no matches)");
  }
}

runSavedSearch('role == "manager"');
runSavedSearch('role == "engineer" && salary > 100000');
runSavedSearch('years >= 8 || salary > 200000');

console.log("\nan unparseable query fails safely instead of running arbitrary code:");
try {
  parse("role = manager"); // note: single =, and no quotes
} catch (err) {
  console.log("  " + (err as Error).message);
}
