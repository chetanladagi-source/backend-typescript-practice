// New shape added later without touching any existing file.

import { Shape } from "./shape";

export class Triangle implements Shape {
  public readonly name: string = "triangle";

  public constructor(
    private readonly base: number,
    private readonly height: number
  ) {}

  public area(): number {
    return (this.base * this.height) / 2;
  }
}
