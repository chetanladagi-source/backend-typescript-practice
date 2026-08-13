// New role added later without touching any existing file.

import { Employee } from "./employee";

export class Intern extends Employee {
  public get role(): string {
    return "intern";
  }

  public bonus(): number {
    return this.baseSalary * 0.05;
  }
}
