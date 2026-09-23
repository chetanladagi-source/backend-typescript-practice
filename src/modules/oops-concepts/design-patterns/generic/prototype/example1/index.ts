// Prototype (generic) — Example 1: clone an employee template.
// Contrasts a shallow clone (fast, wrong) with a deep clone (correct).

interface Address {
  city: string;
  country: string;
}

interface Benefits {
  insurance: boolean;
  ptoDays: number;
  perks: string[];
}

export class Employee {
  constructor(
    public name: string,
    public role: string,
    public salary: number,
    public address: Address,
    public benefits: Benefits,
  ) {}

  // BAD: `{ ...this }` copies own properties one level deep only.
  // The address, benefits and benefits.perks are still SHARED with the source.
  public cloneShallow(): Employee {
    return Object.assign(Object.create(Employee.prototype) as Employee, this);
  }

  // GOOD: rebuild every nested object.
  public clone(): Employee {
    return new Employee(this.name, this.role, this.salary, { ...this.address }, {
      ...this.benefits,
      perks: [...this.benefits.perks], // arrays are objects too, easy to forget
    });
  }

  public describe(): string {
    return `${this.role} ${this.name} @ ${this.address.city} — ${this.salary}, perks: [${this.benefits.perks.join(", ")}]`;
  }
}

// ---- Demo ----

// The template: everything a new hire in Bengaluru starts with.
const template: Employee = new Employee(
  "TEMPLATE",
  "Engineer",
  100000,
  { city: "Bengaluru", country: "IN" },
  { insurance: true, ptoDays: 20, perks: ["gym", "meals"] },
);

console.log("--- correct clone ---");
const ada: Employee = template.clone();
ada.name = "Ada";
ada.salary = 120000;
ada.address.city = "Mysuru";
ada.benefits.perks.push("relocation-bonus");

console.log("  ada     :", ada.describe());
console.log("  template:", template.describe()); // untouched

console.log("\n--- shallow clone: the bug ---");
const grace: Employee = template.cloneShallow();
grace.name = "Grace";           // primitive: only the copy changes
grace.salary = 150000;          // primitive: only the copy changes
grace.address.city = "Chennai"; // NESTED: template mutates too
grace.benefits.perks.push("director-bonus"); // NESTED: template mutates too

console.log("  grace   :", grace.describe());
console.log("  template:", template.describe()); // corrupted
console.log("  address shared?", grace.address === template.address); // true — the bug
console.log("  perks shared?  ", grace.benefits.perks === template.benefits.perks); // true — the bug
