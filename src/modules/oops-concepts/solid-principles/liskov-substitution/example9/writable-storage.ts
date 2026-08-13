// Write side of storage: only backends that really persist declare it.

import { ReadableStorage } from "./readable-storage";

export interface WritableStorage extends ReadableStorage {
  save(key: string, content: string): void;
}
