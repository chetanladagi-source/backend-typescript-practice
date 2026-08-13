// Sealed archive that only exposes reads.

import { ReadableStorage } from "./readable-storage";

export class ArchiveStorage implements ReadableStorage {
  public readonly name: string = "ArchiveStorage";
  private readonly bucket: ReadonlyMap<string, string>;

  public constructor(seed: ReadonlyArray<[string, string]>) {
    this.bucket = new Map<string, string>(seed);
  }

  public load(key: string): string | null {
    return this.bucket.get(key) ?? null;
  }
}
