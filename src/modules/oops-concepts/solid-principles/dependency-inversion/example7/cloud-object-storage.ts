// Bucket implementation of `FileStorage`, added without touching the avatar policy.

import { FileStorage, StoredFile } from "./file-storage";

export class CloudObjectStorage implements FileStorage {
  private readonly objects: Map<string, string> = new Map<string, string>();

  constructor(private readonly bucket: string) {}

  public save(path: string, contents: string): StoredFile {
    console.log(`[cloud] PUT ${this.bucket}/${path}`);
    this.objects.set(path, contents);
    return { location: `https://cdn.example.com/${this.bucket}/${path}`, sizeInBytes: contents.length };
  }

  public read(path: string): string | undefined {
    console.log(`[cloud] GET ${this.bucket}/${path}`);
    return this.objects.get(path);
  }

  public objectCount(): number {
    return this.objects.size;
  }
}
