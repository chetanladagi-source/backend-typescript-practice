// Composite — Example 2: an org chart.
// Same tree shape, but the recursive operation is "total cost of this person's org".

export interface Employee {
  name: string;
  monthlyCost(): number;
  headcount(): number;
  findByName(name: string): Employee | undefined;
}

// Leaf: an individual contributor
class IndividualContributor implements Employee {
  constructor(public readonly name: string, private readonly salary: number) {}

  public monthlyCost(): number {
    return this.salary;
  }

  public headcount(): number {
    return 1;
  }

  public findByName(name: string): Employee | undefined {
    return this.name === name ? this : undefined;
  }
}

// Composite: a manager, who is also an employee with their own salary
class Manager implements Employee {
  private readonly reports: Employee[] = [];

  constructor(public readonly name: string, private readonly salary: number) {}

  public addReport(employee: Employee): this {
    this.reports.push(employee);
    return this;
  }

  public monthlyCost(): number {
    return this.reports.reduce((sum: number, r: Employee): number => sum + r.monthlyCost(), this.salary);
  }

  public headcount(): number {
    return this.reports.reduce((sum: number, r: Employee): number => sum + r.headcount(), 1);
  }

  // Recursive search: another operation that comes free from the tree shape.
  public findByName(name: string): Employee | undefined {
    if (this.name === name) {
      return this;
    }
    for (const report of this.reports) {
      const found: Employee | undefined = report.findByName(name);
      if (found !== undefined) {
        return found;
      }
    }
    return undefined;
  }
}

// ---- Demo ----

const cto: Manager = new Manager("Ada (CTO)", 500_000)
  .addReport(
    new Manager("Grace (EM, Platform)", 350_000)
      .addReport(new IndividualContributor("Linus", 220_000))
      .addReport(new IndividualContributor("Margaret", 240_000)),
  )
  .addReport(
    new Manager("Alan (EM, Product)", 340_000).addReport(new IndividualContributor("Barbara", 210_000)),
  );

console.log("org cost:", cto.monthlyCost());
console.log("headcount:", cto.headcount());

// Any node is itself a valid root, so sub-org reporting needs no extra code.
const platform: Employee | undefined = cto.findByName("Grace (EM, Platform)");
console.log("platform cost:", platform?.monthlyCost(), "headcount:", platform?.headcount());

const ic: Employee | undefined = cto.findByName("Linus");
console.log("single IC cost:", ic?.monthlyCost(), "headcount:", ic?.headcount());
