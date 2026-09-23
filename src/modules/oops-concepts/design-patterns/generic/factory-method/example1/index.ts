// Factory Method (generic) — Example 1: build the right Employee subclass by role.

export interface Employee {
  readonly name: string;
  readonly salary: number;
  computeBonus(): number;
  describe(): string;
}

class Engineer implements Employee {
  constructor(public readonly name: string, public readonly salary: number) {}
  public computeBonus(): number {
    return this.salary * 0.10;
  }
  public describe(): string {
    return `Engineer ${this.name} (salary ${this.salary}, bonus ${this.computeBonus()})`;
  }
}

class Manager implements Employee {
  constructor(public readonly name: string, public readonly salary: number) {}
  public computeBonus(): number {
    // Managers also earn a per-report allowance, added on top of the base rate.
    return this.salary * 0.15 + 5000;
  }
  public describe(): string {
    return `Manager ${this.name} (salary ${this.salary}, bonus ${this.computeBonus()})`;
  }
}

class Intern implements Employee {
  constructor(public readonly name: string, public readonly salary: number) {}
  public computeBonus(): number {
    return 0; // interns do not get a bonus
  }
  public describe(): string {
    return `Intern ${this.name} (stipend ${this.salary}, bonus ${this.computeBonus()})`;
  }
}

export type Role = "engineer" | "manager" | "intern";

// The factory. Callers say WHAT they want, never HOW to build it.
export class EmployeeFactory {
  public static create(role: Role, name: string, salary: number): Employee {
    switch (role) {
      case "engineer":
        return new Engineer(name, salary);
      case "manager":
        return new Manager(name, salary);
      case "intern":
        return new Intern(name, salary);
      default:
        // `never` here means adding a new Role but forgetting a case fails the build.
        return assertNever(role);
    }
  }
}

function assertNever(value: never): never {
  throw new Error(`unknown role: ${JSON.stringify(value)}`);
}

// ---- Demo ----

const rows: { role: Role; name: string; salary: number }[] = [
  { role: "engineer", name: "Ada", salary: 100000 },
  { role: "manager", name: "Grace", salary: 150000 },
  { role: "intern", name: "Linus", salary: 15000 },
];

// Notice: no `if/else` on role at the call site. That branching lives inside the factory,
// which is the WHOLE POINT of the pattern.
const employees: Employee[] = rows.map((r): Employee => EmployeeFactory.create(r.role, r.name, r.salary));

employees.forEach((e: Employee): void => console.log("  " + e.describe()));

const totalBonus: number = employees.reduce((sum: number, e: Employee): number => sum + e.computeBonus(), 0);
console.log("\ntotal bonus payout:", totalBonus);
