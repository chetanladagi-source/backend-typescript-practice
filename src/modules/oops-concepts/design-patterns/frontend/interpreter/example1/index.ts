// Interpreter (frontend) — Example 1: a validation rule DSL.
// The form schema comes from a CMS, so the rules are strings, not code.

export interface Rule {
  validate(value: string, label: string): string | undefined;
}

// Terminal expressions: one class per rule word.
class RequiredRule implements Rule {
  public validate(value: string, label: string): string | undefined {
    return value.trim() === "" ? `${label} is required` : undefined;
  }
}

class MinRule implements Rule {
  constructor(private readonly min: number) {}
  public validate(value: string, label: string): string | undefined {
    return value.length < this.min ? `${label} must be at least ${this.min} characters` : undefined;
  }
}

class MaxRule implements Rule {
  constructor(private readonly max: number) {}
  public validate(value: string, label: string): string | undefined {
    return value.length > this.max ? `${label} must be at most ${this.max} characters` : undefined;
  }
}

class EmailRule implements Rule {
  public validate(value: string, label: string): string | undefined {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? undefined : `${label} must be a valid email`;
  }
}

class MatchesRule implements Rule {
  constructor(private readonly other: string, private readonly values: Record<string, string>) {}
  public validate(value: string, label: string): string | undefined {
    return value === this.values[this.other] ? undefined : `${label} must match ${this.other}`;
  }
}

// Non-terminal: a sequence that stops at the first failure,
// so the user sees "required" and not also "must be 8 characters".
class RuleChain implements Rule {
  constructor(private readonly rules: Rule[]) {}
  public validate(value: string, label: string): string | undefined {
    for (const rule of this.rules) {
      const error: string | undefined = rule.validate(value, label);
      if (error !== undefined) {
        return error;
      }
    }
    return undefined;
  }
}

// A rule that only applies when the value is non-empty (so "optional but if present, an email").
class WhenFilledRule implements Rule {
  constructor(private readonly inner: Rule) {}
  public validate(value: string, label: string): string | undefined {
    return value.trim() === "" ? undefined : this.inner.validate(value, label);
  }
}

// The parser: "required|min:8" -> RuleChain([RequiredRule, MinRule(8)])
export function parseRules(spec: string, values: Record<string, string>): Rule {
  const rules: Rule[] = spec
    .split("|")
    .map((token: string): string => token.trim())
    .filter((token: string): boolean => token !== "")
    .map((token: string): Rule => {
      const [name, arg] = token.split(":") as [string, string | undefined];
      switch (name) {
        case "required":
          return new RequiredRule();
        case "min":
          return new MinRule(Number(arg));
        case "max":
          return new MaxRule(Number(arg));
        case "email":
          return new WhenFilledRule(new EmailRule());
        case "matches":
          return new MatchesRule(String(arg), values);
        default:
          // A rule the CMS invented that this app version does not know about.
          throw new Error(`unknown rule "${name}"`);
      }
    });
  return new RuleChain(rules);
}

// ---- Demo ----

const values: Record<string, string> = {
  email: "not-an-email",
  password: "short",
  confirm: "different",
  nickname: "",
};

// Exactly what a CMS-driven schema would hand you.
const schema: { field: string; label: string; rules: string }[] = [
  { field: "email", label: "Email", rules: "required|email" },
  { field: "password", label: "Password", rules: "required|min:8|max:64" },
  { field: "confirm", label: "Confirm password", rules: "required|matches:password" },
  { field: "nickname", label: "Nickname", rules: "max:20" },
];

function run(input: Record<string, string>): void {
  schema.forEach((f): void => {
    const rule: Rule = parseRules(f.rules, input);
    const error: string | undefined = rule.validate(input[f.field] ?? "", f.label);
    console.log(`  ${f.field.padEnd(10)} ${f.rules.padEnd(24)} ${error ?? "ok"}`);
  });
}

console.log("bad input:");
run(values);

console.log("\ngood input:");
run({ email: "ada@example.com", password: "correct-horse", confirm: "correct-horse", nickname: "" });

console.log("\nan unknown rule from the CMS fails loudly instead of silently passing:");
try {
  parseRules("required|iban", {}).validate("x", "Account");
} catch (err) {
  console.log(`  ${(err as Error).message}`);
}
