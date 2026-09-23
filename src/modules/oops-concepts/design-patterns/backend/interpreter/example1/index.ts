// Interpreter — Example 1: arithmetic with variables.
// The "hello world" of the pattern: one class per grammar rule.

export type Context = Record<string, number>;

export interface Expression {
  interpret(context: Context): number;
  toString(): string;
}

// --- Terminal expressions (the leaves) ---

class Literal implements Expression {
  constructor(private readonly value: number) {}

  public interpret(): number {
    return this.value;
  }
  public toString(): string {
    return String(this.value);
  }
}

class Variable implements Expression {
  constructor(private readonly name: string) {}

  public interpret(context: Context): number {
    const value: number | undefined = context[this.name];
    if (value === undefined) {
      throw new Error(`undefined variable "${this.name}"`);
    }
    return value;
  }
  public toString(): string {
    return this.name;
  }
}

// --- Non-terminal expressions (compose other expressions) ---

class Add implements Expression {
  constructor(private readonly left: Expression, private readonly right: Expression) {}

  public interpret(context: Context): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
  public toString(): string {
    return `(${this.left} + ${this.right})`;
  }
}

class Subtract implements Expression {
  constructor(private readonly left: Expression, private readonly right: Expression) {}

  public interpret(context: Context): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }
  public toString(): string {
    return `(${this.left} - ${this.right})`;
  }
}

class Multiply implements Expression {
  constructor(private readonly left: Expression, private readonly right: Expression) {}

  public interpret(context: Context): number {
    return this.left.interpret(context) * this.right.interpret(context);
  }
  public toString(): string {
    return `(${this.left} * ${this.right})`;
  }
}

// ---- Demo ----

// (price * quantity) - discount
const total: Expression = new Subtract(
  new Multiply(new Variable("price"), new Variable("quantity")),
  new Variable("discount"),
);

console.log("expression:", total.toString());

// The same tree evaluated against different contexts — that is the payoff.
const carts: Context[] = [
  { price: 500, quantity: 3, discount: 200 },
  { price: 1200, quantity: 1, discount: 0 },
  { price: 99, quantity: 10, discount: 150 },
];

carts.forEach((ctx: Context): void => {
  console.log(`  ${JSON.stringify(ctx)} => ${total.interpret(ctx)}`);
});

console.log("--- a missing variable ---");
try {
  total.interpret({ price: 100, quantity: 2 });
} catch (err) {
  console.log("  ", (err as Error).message);
}

// Trees are values: they can be built up and reused.
const withTax: Expression = new Add(total, new Multiply(total, new Literal(0.18)));
console.log("with tax:", withTax.toString());
console.log("  =>", withTax.interpret({ price: 500, quantity: 3, discount: 200 }));
