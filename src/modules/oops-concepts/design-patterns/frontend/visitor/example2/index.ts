// Visitor (frontend) — Example 2: the TypeScript-idiomatic form.
// A discriminated union plus an exhaustive switch gives you Visitor
// with the compiler enforcing completeness.

export type Field =
  | { kind: "text"; name: string; label: string; required: boolean }
  | { kind: "number"; name: string; label: string; min: number }
  | { kind: "checkbox"; name: string; label: string }
  | { kind: "group"; label: string; fields: Field[] };

type Values = Record<string, string | number | boolean>;

// `never` is the trick: if a new Field kind is added and a switch misses it,
// the leftover type is no longer `never` and the build fails.
function assertNever(value: never): never {
  throw new Error(`unhandled field: ${JSON.stringify(value)}`);
}

// Visitor 1: render.
function render(field: Field, indent: string = ""): string {
  switch (field.kind) {
    case "text":
      return `${indent}<input name="${field.name}" placeholder="${field.label}"${field.required ? " required" : ""}>`;
    case "number":
      return `${indent}<input type="number" name="${field.name}" min="${field.min}">`;
    case "checkbox":
      return `${indent}<input type="checkbox" name="${field.name}"> ${field.label}`;
    case "group":
      return [
        `${indent}<fieldset><legend>${field.label}</legend>`,
        ...field.fields.map((f: Field): string => render(f, `${indent}  `)),
        `${indent}</fieldset>`,
      ].join("\n");
    default:
      return assertNever(field);
  }
}

// Visitor 2: validate.
function validate(field: Field, values: Values, errors: string[] = []): string[] {
  switch (field.kind) {
    case "text": {
      const value: string = String(values[field.name] ?? "");
      if (field.required && value === "") {
        errors.push(`${field.label} is required`);
      }
      return errors;
    }
    case "number": {
      const value: number = Number(values[field.name] ?? 0);
      if (value < field.min) {
        errors.push(`${field.label} must be at least ${field.min}`);
      }
      return errors;
    }
    case "checkbox":
      return errors; // nothing can be invalid about a checkbox
    case "group":
      field.fields.forEach((f: Field): void => {
        validate(f, values, errors);
      });
      return errors;
    default:
      return assertNever(field);
  }
}

// Visitor 3: build default values. Same traversal, third operation.
function defaults(field: Field, into: Values = {}): Values {
  switch (field.kind) {
    case "text":
      into[field.name] = "";
      return into;
    case "number":
      into[field.name] = field.min;
      return into;
    case "checkbox":
      into[field.name] = false;
      return into;
    case "group":
      field.fields.forEach((f: Field): void => {
        defaults(f, into);
      });
      return into;
    default:
      return assertNever(field);
  }
}

// ---- Demo ----

const schema: Field = {
  kind: "group",
  label: "Shipping",
  fields: [
    { kind: "text", name: "name", label: "Full name", required: true },
    { kind: "text", name: "line2", label: "Apartment", required: false },
    { kind: "number", name: "qty", label: "Quantity", min: 1 },
    { kind: "checkbox", name: "gift", label: "This is a gift" },
  ],
};

console.log(render(schema));

console.log("\ndefault values:", defaults(schema));

console.log("\nvalidating an empty form:");
validate(schema, defaults(schema)).forEach((e: string): void => console.log(`  ${e}`));

console.log("\nvalidating a filled form:");
const filled: Values = { name: "Ada", line2: "", qty: 2, gift: true };
const errors: string[] = validate(schema, filled);
console.log(errors.length === 0 ? "  no errors" : errors.join("\n"));
