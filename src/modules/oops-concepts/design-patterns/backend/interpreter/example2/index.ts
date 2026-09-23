// Interpreter — Example 2: a boolean rule engine for feature-flag targeting.
// Rules come from config, so product can change targeting without a deploy.

export type UserContext = Record<string, string | number | boolean>;

export interface Rule {
  evaluate(user: UserContext): boolean;
  describe(): string;
}

// --- Terminals ---

class Equals implements Rule {
  constructor(private readonly field: string, private readonly value: string | number | boolean) {}

  public evaluate(user: UserContext): boolean {
    return user[this.field] === this.value;
  }
  public describe(): string {
    return `${this.field} = ${JSON.stringify(this.value)}`;
  }
}

class GreaterThan implements Rule {
  constructor(private readonly field: string, private readonly value: number) {}

  public evaluate(user: UserContext): boolean {
    return Number(user[this.field] ?? 0) > this.value;
  }
  public describe(): string {
    return `${this.field} > ${this.value}`;
  }
}

class OneOf implements Rule {
  constructor(private readonly field: string, private readonly values: string[]) {}

  public evaluate(user: UserContext): boolean {
    return this.values.includes(String(user[this.field]));
  }
  public describe(): string {
    return `${this.field} in [${this.values.join(", ")}]`;
  }
}

// --- Non-terminals ---

class And implements Rule {
  private readonly rules: Rule[];
  constructor(...rules: Rule[]) {
    this.rules = rules;
  }

  public evaluate(user: UserContext): boolean {
    return this.rules.every((r: Rule): boolean => r.evaluate(user));
  }
  public describe(): string {
    return `(${this.rules.map((r: Rule): string => r.describe()).join(" AND ")})`;
  }
}

class Or implements Rule {
  private readonly rules: Rule[];
  constructor(...rules: Rule[]) {
    this.rules = rules;
  }

  public evaluate(user: UserContext): boolean {
    return this.rules.some((r: Rule): boolean => r.evaluate(user));
  }
  public describe(): string {
    return `(${this.rules.map((r: Rule): string => r.describe()).join(" OR ")})`;
  }
}

class Not implements Rule {
  constructor(private readonly rule: Rule) {}

  public evaluate(user: UserContext): boolean {
    return !this.rule.evaluate(user);
  }
  public describe(): string {
    return `NOT ${this.rule.describe()}`;
  }
}

// ---- Demo ----

// "Show the new checkout to internal staff, OR to paying users in India
//  who have been here a while — but never to anyone who opted out."
const newCheckout: Rule = new And(
  new Or(
    new Equals("isStaff", true),
    new And(new OneOf("plan", ["pro", "enterprise"]), new Equals("country", "IN"), new GreaterThan("accountAgeDays", 30)),
  ),
  new Not(new Equals("optedOutOfBeta", true)),
);

console.log("rule:", newCheckout.describe());
console.log("");

const users: [string, UserContext][] = [
  ["staff member", { isStaff: true, plan: "free", country: "US", accountAgeDays: 2 }],
  ["indian pro, established", { isStaff: false, plan: "pro", country: "IN", accountAgeDays: 400 }],
  ["indian pro, brand new", { isStaff: false, plan: "pro", country: "IN", accountAgeDays: 5 }],
  ["us enterprise", { isStaff: false, plan: "enterprise", country: "US", accountAgeDays: 900 }],
  ["staff who opted out", { isStaff: true, plan: "pro", country: "IN", optedOutOfBeta: true }],
];

users.forEach(([label, user]: [string, UserContext]): void => {
  console.log(`${newCheckout.evaluate(user) ? "SHOW " : "hide "} ${label}`);
});
