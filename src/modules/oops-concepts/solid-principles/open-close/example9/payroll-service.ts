// Payroll that pays any Employee polymorphically.

import { Employee } from "./employee";

export class PayrollService {
  public run(employees: Employee[]): number {
    let total: number = 0;
    for (const employee of employees) {
      const bonus: number = employee.bonus();
      total += bonus;
      console.log(`${employee.name} (${employee.role}) bonus = ${bonus.toFixed(2)}`);
    }
    console.log(`total bonus payout = ${total.toFixed(2)}`);
    return total;
  }
}
