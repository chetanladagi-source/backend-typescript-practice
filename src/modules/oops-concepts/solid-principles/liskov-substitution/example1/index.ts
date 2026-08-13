// Runnable entry point: violating design first, then the LSP-compliant design.

import { Rectangle as BadRectangle, Square as BadSquare, resizeAndExpectArea } from "./rectangle-violation";
import { Rectangle } from "./rectangle";
import { Square } from "./square";
import { reportTotalArea } from "./area-reporter";

export function run(): void {
  console.log("=== Violation ===");
  console.log(`Rectangle area: ${resizeAndExpectArea(new BadRectangle())}`);
  try {
    console.log(`Square area: ${resizeAndExpectArea(new BadSquare())}`);
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  const total: number = reportTotalArea([new Rectangle(5, 4), new Square(5)]);
  console.log(`Total area: ${total}`);
}

run();
