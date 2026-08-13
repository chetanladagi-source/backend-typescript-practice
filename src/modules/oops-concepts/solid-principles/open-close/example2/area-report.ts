// Reporting service that works with any Shape.

import { Shape } from "./shape";

export class AreaReport {
  public print(shapes: Shape[]): number {
    let total: number = 0;
    for (const shape of shapes) {
      const area: number = shape.area();
      total += area;
      console.log(`${shape.name} area = ${area.toFixed(2)}`);
    }
    console.log(`total area = ${total.toFixed(2)}`);
    return total;
  }
}
