// Consumers ask for the exact storage capability they need.

import { ReadableStorage } from "./readable-storage";
import { WritableStorage } from "./writable-storage";

export function backupReport(storage: WritableStorage, key: string, content: string): string {
  storage.save(key, content);
  const stored: string | null = storage.load(key);
  if (stored !== content) {
    throw new Error(`Broken contract: ${key} was not persisted in ${storage.name}`);
  }
  return stored;
}

export function restoreReport(storage: ReadableStorage, key: string): void {
  const stored: string | null = storage.load(key);
  console.log(`${storage.name} -> ${key}: ${stored ?? "not found"}`);
}
