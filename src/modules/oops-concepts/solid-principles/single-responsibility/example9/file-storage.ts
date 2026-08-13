// Only holds file bytes and returns where they landed.

import { UploadedFile } from "./file-upload-violation";

export class FileStorage {
  private readonly blobs: Map<string, string> = new Map<string, string>();

  public constructor(private readonly basePath: string) {}

  public store(file: UploadedFile): string {
    const path: string = this.basePath + file.name;
    this.blobs.set(path, file.contents);
    console.log("[storage] stored", path);
    return path;
  }

  public read(path: string): string | undefined {
    return this.blobs.get(path);
  }
}
