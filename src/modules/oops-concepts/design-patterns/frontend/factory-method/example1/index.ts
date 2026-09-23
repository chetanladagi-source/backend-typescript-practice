// Factory Method (frontend) — Example 1: a schema-driven form renderer.
// The backend sends a JSON schema; something must map "type" to a component.

export interface FieldSchema {
  type: string;
  name: string;
  label: string;
  options?: string[];
}

// Our stand-in for a component: takes a schema, returns markup.
export interface FieldComponent {
  render(schema: FieldSchema, value: string): string;
}

class TextField implements FieldComponent {
  public render(schema: FieldSchema, value: string): string {
    return `<label>${schema.label}<input type="text" name="${schema.name}" value="${value}" /></label>`;
  }
}

class SelectField implements FieldComponent {
  public render(schema: FieldSchema, value: string): string {
    const options: string = (schema.options ?? [])
      .map((o: string): string => `<option${o === value ? " selected" : ""}>${o}</option>`)
      .join("");
    return `<label>${schema.label}<select name="${schema.name}">${options}</select></label>`;
  }
}

class CheckboxField implements FieldComponent {
  public render(schema: FieldSchema, value: string): string {
    return `<label><input type="checkbox" name="${schema.name}"${value === "true" ? " checked" : ""} /> ${schema.label}</label>`;
  }
}

class UnknownField implements FieldComponent {
  public render(schema: FieldSchema): string {
    // Never crash the whole form because of one unrecognised field type.
    return `<!-- unsupported field type "${schema.type}" for ${schema.name} -->`;
  }
}

// The registry IS the factory. Teams register their own types without editing this file.
const fieldRegistry: Map<string, () => FieldComponent> = new Map<string, () => FieldComponent>([
  ["text", (): FieldComponent => new TextField()],
  ["select", (): FieldComponent => new SelectField()],
  ["checkbox", (): FieldComponent => new CheckboxField()],
]);

export function registerField(type: string, factory: () => FieldComponent): void {
  fieldRegistry.set(type, factory);
}

function createField(type: string): FieldComponent {
  return (fieldRegistry.get(type) ?? ((): FieldComponent => new UnknownField()))();
}

// The renderer knows nothing about any concrete field component.
function renderForm(schema: FieldSchema[], values: Record<string, string>): string {
  return schema
    .map((field: FieldSchema): string => createField(field.type).render(field, values[field.name] ?? ""))
    .join("\n");
}

// ---- Demo ----

const schema: FieldSchema[] = [
  { type: "text", name: "fullName", label: "Full name" },
  { type: "select", name: "country", label: "Country", options: ["India", "USA", "Germany"] },
  { type: "checkbox", name: "newsletter", label: "Subscribe to the newsletter" },
  { type: "signature-pad", name: "sign", label: "Signature" }, // not registered yet
];

console.log(renderForm(schema, { fullName: "Ada", country: "India", newsletter: "true" }));

// A feature team adds a field type at runtime; renderForm is untouched.
console.log("\n--- after the signature module registers itself ---");
registerField("signature-pad", (): FieldComponent => ({
  render: (s: FieldSchema): string => `<canvas data-field="${s.name}" aria-label="${s.label}"></canvas>`,
}));

console.log(renderForm(schema, { fullName: "Ada", country: "India", newsletter: "true" }));
