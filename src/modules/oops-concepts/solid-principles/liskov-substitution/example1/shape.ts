// Refactored abstraction: every shape can only report its own area.

export interface Shape {
  readonly name: string;
  getArea(): number;
}
