// Composite (generic) — Example 1: an org chart where a Team and an Employee
// answer the same questions.

export interface OrgUnit {
  readonly name: string;
  totalSalary(): number;
  headcount(): number;
  print(indent?: string): void;
}

// Leaf.
class Employee implements OrgUnit {
  constructor(public readonly name: string, private readonly salary: number) {}

  public totalSalary(): number {
    return this.salary;
  }

  public headcount(): number {
    return 1;
  }

  public print(indent: string = ""): void {
    console.log(`${indent}- ${this.name}  (Rs.${this.salary})`);
  }
}

// Composite.
class Team implements OrgUnit {
  private readonly members: OrgUnit[] = [];

  constructor(public readonly name: string) {}

  // Accepts either a leaf or another composite — that is the whole point of the pattern.
  public add(unit: OrgUnit): this {
    this.members.push(unit);
    return this;
  }

  public totalSalary(): number {
    return this.members.reduce((sum: number, m: OrgUnit): number => sum + m.totalSalary(), 0);
  }

  public headcount(): number {
    return this.members.reduce((n: number, m: OrgUnit): number => n + m.headcount(), 0);
  }

  public print(indent: string = ""): void {
    console.log(`${indent}+ ${this.name}  (headcount ${this.headcount()}, payroll Rs.${this.totalSalary()})`);
    this.members.forEach((m: OrgUnit): void => m.print(indent + "  "));
  }
}

// ---- Demo ----

const engineering: Team = new Team("Engineering")
  .add(new Employee("Ada", 120000))
  .add(new Employee("Grace", 130000))
  .add(
    new Team("Payments Squad") // a team inside a team — the recursion the pattern makes trivial
      .add(new Employee("Linus", 110000))
      .add(new Employee("Radia", 115000)),
  );

const design: Team = new Team("Design")
  .add(new Employee("Yves", 95000))
  .add(new Employee("Dieter", 100000));

const company: Team = new Team("Acme").add(engineering).add(design).add(new Employee("CEO Hopper", 250000));

company.print();

console.log(`\ntotal headcount: ${company.headcount()}`);
console.log(`monthly payroll: Rs.${company.totalSalary()}`);

// The point of the pattern: `company` and `Ada` support the same methods.
// A payroll function does not need to check `if (unit instanceof Team)` anywhere.
