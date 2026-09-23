// Builder (frontend) — Example 1: a form schema builder.
// The shape Zod and Yup made familiar: chain constraints, then build.

export interface ValidationRule {
  message: string;
  test(value: string): boolean;
}

export interface FieldSchema {
  readonly name: string;
  readonly label: string;
  readonly inputType: string;
  readonly rules: readonly ValidationRule[];
}

class FieldBuilder {
  private label: string;
  private inputType: string = "text";
  private readonly rules: ValidationRule[] = [];

  constructor(private readonly name: string) {
    // A sensible default label so the common case needs no extra call.
    this.label = name.replace(/([A-Z])/g, " $1").replace(/^./, (c: string): string => c.toUpperCase());
  }

  public labelled(label: string): this {
    this.label = label;
    return this;
  }

  public type(inputType: string): this {
    this.inputType = inputType;
    return this;
  }

  public required(message: string = "This field is required"): this {
    this.rules.push({ message, test: (v: string): boolean => v.trim() !== "" });
    return this;
  }

  public min(length: number): this {
    this.rules.push({
      message: `Must be at least ${length} characters`,
      test: (v: string): boolean => v.length >= length,
    });
    return this;
  }

  public email(): this {
    this.inputType = "email";
    this.rules.push({ message: "Enter a valid email", test: (v: string): boolean => /^[^@\s]+@[^@\s]+\.\w+$/.test(v) });
    return this;
  }

  public matches(other: string, getValue: () => string): this {
    this.rules.push({ message: `Must match ${other}`, test: (v: string): boolean => v === getValue() });
    return this;
  }

  public build(): FieldSchema {
    return { name: this.name, label: this.label, inputType: this.inputType, rules: [...this.rules] };
  }
}

export function field(name: string): FieldBuilder {
  return new FieldBuilder(name);
}

// Validating a whole form is then trivial: rules run in the order they were chained.
function validate(schema: FieldSchema[], values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  schema.forEach((f: FieldSchema): void => {
    const value: string = values[f.name] ?? "";
    const failed: ValidationRule | undefined = f.rules.find((r: ValidationRule): boolean => !r.test(value));
    if (failed !== undefined) {
      errors[f.name] = failed.message;
    }
  });
  return errors;
}

// ---- Demo ----

const values: Record<string, string> = {
  fullName: "Ada",
  email: "ada@example",
  password: "short",
  confirmPassword: "different",
};

const signupForm: FieldSchema[] = [
  field("fullName").required().min(2).build(),
  field("email").required().email().build(),
  field("password").type("password").required().min(8).build(),
  field("confirmPassword")
    .labelled("Confirm password")
    .type("password")
    .required()
    .matches("password", (): string => values.password)
    .build(),
];

signupForm.forEach((f: FieldSchema): void => {
  console.log(`${f.name.padEnd(16)} label="${f.label}" type=${f.inputType} rules=${f.rules.length}`);
});

console.log("\nvalidation errors:");
console.log(validate(signupForm, values));

console.log("\nafter the user fixes everything:");
console.log(
  validate(signupForm, {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    password: "correct-horse",
    confirmPassword: "correct-horse",
  }),
);
