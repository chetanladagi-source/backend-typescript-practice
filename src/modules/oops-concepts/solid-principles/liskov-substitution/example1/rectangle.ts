// Immutable rectangle: resizing returns a new value instead of mutating shared state.

import { Shape } from "./shape";

export class Rectangle implements Shape {
  public readonly name: string = "Rectangle";

  public constructor(private readonly width: number, private readonly height: number) {}

  public getArea(): number {
    return this.width * this.height;
  }

  public withSize(width: number, height: number): Rectangle {
    return new Rectangle(width, height);
  }
}
