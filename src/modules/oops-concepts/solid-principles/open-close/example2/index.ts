// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyAreaCalculator, ShapeData } from "./area-violation";
import { Shape } from "./shape";
import { Rectangle } from "./rectangle";
import { Circle } from "./circle";
import { Triangle } from "./triangle";
import { AreaReport } from "./area-report";

console.log("=== Violation ===");
const legacy: LegacyAreaCalculator = new LegacyAreaCalculator();
const legacyShapes: ShapeData[] = [
  { type: "rectangle", width: 4, height: 3 },
  { type: "circle", radius: 2 },
  { type: "triangle", base: 6, height: 4 },
];
for (const shape of legacyShapes) {
  console.log(`${shape.type} area = ${legacy.area(shape).toFixed(2)}`);
}

console.log("\n=== OCP applied ===");
const report: AreaReport = new AreaReport();
const shapes: Shape[] = [new Rectangle(4, 3), new Circle(2)];
report.print(shapes);

console.log("\n=== Extension without modification ===");
report.print([...shapes, new Triangle(6, 4)]);
