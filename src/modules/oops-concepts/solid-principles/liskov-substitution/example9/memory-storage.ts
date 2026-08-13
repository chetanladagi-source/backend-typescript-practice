// Backend that honours both reads and writes.

import { WritableStorage } from "./writable-storage";

export class MemoryStorage implements WritableStorage {
  public readonly name: string = "MemoryStorage";
  private readonly bucket: Map<string, string> = new Map<string, string>();

  public save(key: string, content: string): void {
    this.bucket.set(key, content);
    console.log(`${this.name} stored ${key}`);
  }

  public load(key: string): string | null {
    return this.bucket.get(key) ?? null;
  }
}
