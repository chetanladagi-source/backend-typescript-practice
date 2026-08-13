// God employee class, kept as the "before" picture.

export interface EmployeeData {
  id: string;
  name: string;
  monthlySalary: number;
  yearsOfService: number;
}

// SRP violation: domain rules, persistence and payslip printing live together.
export class EmployeeGod {
  private static readonly table: EmployeeData[] = [];

  public constructor(private readonly data: EmployeeData) {}

  public annualSalary(): number {
    return this.data.monthlySalary * 12;
  }

  public bonus(): number {
    return this.data.yearsOfService >= 5 ? this.annualSalary() * 0.1 : 0;
  }

  public save(): void {
    EmployeeGod.table.push(this.data);
    console.log("[god] saved employee", this.data.id, "rows:", EmployeeGod.table.length);
  }

  public printPayslip(): void {
    console.log("[god] PAYSLIP " + this.data.name);
    console.log("[god]   annual: " + this.annualSalary().toFixed(2));
    console.log("[god]   bonus:  " + this.bonus().toFixed(2));
  }
}
