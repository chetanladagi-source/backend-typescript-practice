// Square is a sibling of Rectangle, not a subtype of it.

import { Shape } from "./shape";

export class Square implements Shape {
  public readonly name: string = "Square";

  public constructor(private readonly side: number) {}

  public getArea(): number {
    return this.side * this.side;
  }

  public withSide(side: number): Square {
    return new Square(side);
  }
}
