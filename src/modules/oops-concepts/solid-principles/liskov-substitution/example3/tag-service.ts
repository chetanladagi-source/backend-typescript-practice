// Consumers request the exact side of the contract they use.

import { ReadableList } from "./readable-list";
import { WritableList } from "./writable-list";

export function appendTags(list: WritableList<string>, tags: ReadonlyArray<string>): number {
  for (const tag of tags) {
    list.add(tag);
  }
  return list.size();
}

export function printTags(label: string, list: ReadableList<string>): void {
  console.log(`${label} (${list.size()}): ${list.toArray().join(", ")}`);
}
