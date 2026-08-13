// Abstraction every shape implements.

export interface Shape {
  readonly name: string;
  area(): number;
}
