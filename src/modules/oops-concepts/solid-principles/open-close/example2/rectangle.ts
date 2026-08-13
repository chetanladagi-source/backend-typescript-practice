// Rectangle implementation of Shape.

import { Shape } from "./shape";

export class Rectangle implements Shape {
  public readonly name: string = "rectangle";

  public constructor(
    private readonly width: number,
    private readonly height: number
  ) {}

  public area(): number {
    return this.width * this.height;
  }
}
