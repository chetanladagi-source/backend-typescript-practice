// Consumer that works with any Shape without knowing the concrete type.

import { Shape } from "./shape";

export function reportTotalArea(shapes: ReadonlyArray<Shape>): number {
  let total: number = 0;
  for (const shape of shapes) {
    console.log(`${shape.name} area = ${shape.getArea()}`);
    total += shape.getArea();
  }
  return total;
}
