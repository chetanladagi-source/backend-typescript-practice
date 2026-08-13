// Employee without a bonus scheme, and honest about it.

import { Employee } from "./employee";

export class Intern implements Employee {
  public constructor(
    public readonly name: string,
    private readonly monthlyStipend: number,
    public readonly durationInMonths: number
  ) {}

  public calculateAnnualPay(): number {
    return this.monthlyStipend * this.durationInMonths;
  }

  public certificateTitle(): string {
    return `${this.name} - ${this.durationInMonths} month internship`;
  }
}
