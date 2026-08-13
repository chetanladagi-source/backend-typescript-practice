// Consumers state which ordering they depend on.

import { Queue } from "./queue";
import { Stack } from "./stack";

export function drainInArrivalOrder(queue: Queue<string>, tickets: ReadonlyArray<string>): string[] {
  for (const ticket of tickets) {
    queue.enqueue(ticket);
  }

  const drained: string[] = [];
  while (queue.size() > 0) {
    const item: string | undefined = queue.dequeue();
    if (item !== undefined) {
      drained.push(item);
    }
  }
  return drained;
}

export function undoInReverseOrder(stack: Stack<string>, actions: ReadonlyArray<string>): string[] {
  for (const action of actions) {
    stack.push(action);
  }

  const undone: string[] = [];
  while (stack.size() > 0) {
    const item: string | undefined = stack.pop();
    if (item !== undefined) {
      undone.push(item);
    }
  }
  return undone;
}
