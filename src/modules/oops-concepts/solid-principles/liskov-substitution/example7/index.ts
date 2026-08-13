// Runnable entry point: violating design first, then the LSP-compliant design.

import { Queue as BadQueue, Stack as BadStack, drainInArrivalOrder as badDrain } from "./queue-violation";
import { FifoQueue } from "./fifo-queue";
import { LifoStack } from "./lifo-stack";
import { drainInArrivalOrder, undoInReverseOrder } from "./ticket-processor";

export function run(): void {
  console.log("=== Violation ===");
  console.log(`Queue drained: ${badDrain(new BadQueue()).join(", ")}`);
  try {
    console.log(`Stack drained: ${badDrain(new BadStack()).join(", ")}`);
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  const tickets: ReadonlyArray<string> = ["ticket-1", "ticket-2", "ticket-3"];
  console.log(`Queue drained: ${drainInArrivalOrder(new FifoQueue<string>(), tickets).join(", ")}`);
  console.log(`Stack undone: ${undoInReverseOrder(new LifoStack<string>(), tickets).join(", ")}`);
}

run();
