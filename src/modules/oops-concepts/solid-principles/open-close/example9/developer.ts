// Developer bonus policy.

import { Employee } from "./employee";

export class Developer extends Employee {
  public get role(): string {
    return "developer";
  }

  public bonus(): number {
    return this.baseSalary * 0.1;
  }
}
