// Circle implementation of Shape.

import { Shape } from "./shape";

export class Circle implements Shape {
  public readonly name: string = "circle";

  public constructor(private readonly radius: number) {}

  public area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
