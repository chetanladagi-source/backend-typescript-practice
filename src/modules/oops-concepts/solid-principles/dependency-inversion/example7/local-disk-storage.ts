// Disk implementation of `FileStorage`; writes are simulated in a map.

import { FileStorage, StoredFile } from "./file-storage";

export class LocalDiskStorage implements FileStorage {
  private readonly files: Map<string, string> = new Map<string, string>();

  constructor(private readonly rootDir: string) {}

  public save(path: string, contents: string): StoredFile {
    const fullPath: string = `${this.rootDir}/${path}`;
    console.log(`[disk] write ${fullPath} (${contents.length} bytes)`);
    this.files.set(fullPath, contents);
    return { location: fullPath, sizeInBytes: contents.length };
  }

  public read(path: string): string | undefined {
    const fullPath: string = `${this.rootDir}/${path}`;
    console.log(`[disk] read ${fullPath}`);
    return this.files.get(fullPath);
  }
}
