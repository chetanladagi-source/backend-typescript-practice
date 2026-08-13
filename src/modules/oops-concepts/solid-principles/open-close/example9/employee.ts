// Base type that every employee role extends.

export abstract class Employee {
  public constructor(
    public readonly name: string,
    public readonly baseSalary: number
  ) {}

  public abstract get role(): string;

  public abstract bonus(): number;
}
