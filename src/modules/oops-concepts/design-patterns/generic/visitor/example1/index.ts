// Visitor (generic) — Example 1: employee types stay still; each report is a new visitor.

export interface EmployeeVisitor {
  visitEngineer(e: Engineer): void;
  visitManager(e: Manager): void;
  visitIntern(e: Intern): void;
}

interface Staff {
  readonly name: string;
  accept(visitor: EmployeeVisitor): void;
}

export class Engineer implements Staff {
  constructor(public readonly name: string, public readonly salary: number, public readonly language: string) {}
  public accept(visitor: EmployeeVisitor): void {
    visitor.visitEngineer(this);
  }
}

export class Manager implements Staff {
  constructor(public readonly name: string, public readonly salary: number, public readonly teamSize: number) {}
  public accept(visitor: EmployeeVisitor): void {
    visitor.visitManager(this);
  }
}

export class Intern implements Staff {
  constructor(public readonly name: string, public readonly stipend: number) {}
  public accept(visitor: EmployeeVisitor): void {
    visitor.visitIntern(this);
  }
}

// Visitor 1: payroll. Different pay rules per type, without putting them on the classes.
class PayrollVisitor implements EmployeeVisitor {
  public total: number = 0;

  public visitEngineer(e: Engineer): void {
    const bonus: number = e.salary * 0.1;
    this.total += e.salary + bonus;
    console.log(`  ${e.name} (eng/${e.language})  salary ${e.salary} + bonus ${bonus}`);
  }
  public visitManager(e: Manager): void {
    const bonus: number = e.salary * 0.15 + e.teamSize * 1000;
    this.total += e.salary + bonus;
    console.log(`  ${e.name} (mgr/${e.teamSize})  salary ${e.salary} + bonus ${bonus}`);
  }
  public visitIntern(e: Intern): void {
    this.total += e.stipend;
    console.log(`  ${e.name} (intern)             stipend ${e.stipend}`);
  }
}

// Visitor 2: a directory line. Same tree, different output.
class DirectoryVisitor implements EmployeeVisitor {
  public visitEngineer(e: Engineer): void {
    console.log(`  [ENG] ${e.name} — ${e.language}`);
  }
  public visitManager(e: Manager): void {
    console.log(`  [MGR] ${e.name} — leads ${e.teamSize}`);
  }
  public visitIntern(e: Intern): void {
    console.log(`  [INT] ${e.name}`);
  }
}

// Visitor 3: tax estimate. Returns nothing printed per row; accumulates.
class TaxVisitor implements EmployeeVisitor {
  public tax: number = 0;
  public visitEngineer(e: Engineer): void {
    this.tax += e.salary * 0.2;
  }
  public visitManager(e: Manager): void {
    this.tax += e.salary * 0.3;
  }
  public visitIntern(): void {
    // interns are not taxed in this toy company
  }
}

// ---- Demo ----

const staff: Staff[] = [
  new Engineer("Ada", 120000, "TypeScript"),
  new Manager("Grace", 180000, 6),
  new Intern("Linus", 15000),
  new Engineer("Radia", 110000, "Go"),
];

function walk(visitor: EmployeeVisitor): void {
  staff.forEach((s: Staff): void => {
    s.accept(visitor);
  });
}

console.log("payroll:");
const payroll: PayrollVisitor = new PayrollVisitor();
walk(payroll);
console.log("  TOTAL Rs." + payroll.total);

console.log("\ndirectory:");
walk(new DirectoryVisitor());

console.log("\ntax estimate:");
const tax: TaxVisitor = new TaxVisitor();
walk(tax);
console.log("  TAX Rs." + tax.tax);

// Adding a fourth report (equity grant) is one new visitor class.
// Adding a fourth employee type (Contractor) means editing the interface AND every visitor.
// That trade is the whole pattern: operations grow cheap, node types grow expensive.
