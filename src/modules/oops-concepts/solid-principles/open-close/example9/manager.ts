// Manager bonus policy.

import { Employee } from "./employee";

export class Manager extends Employee {
  public get role(): string {
    return "manager";
  }

  public bonus(): number {
    return this.baseSalary * 0.2;
  }
}
