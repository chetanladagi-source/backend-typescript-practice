// High-level policy: avatar naming and size rules, storage medium unknown.

import { FileStorage, StoredFile } from "./file-storage";

export class AvatarService {
  private static readonly maxBytes: number = 64;

  constructor(private readonly storage: FileStorage) {}

  public upload(userId: string, contents: string): string {
    if (contents.length > AvatarService.maxBytes) {
      console.log("[avatars] rejected: too large for", userId);
      return "rejected";
    }
    const stored: StoredFile = this.storage.save(`avatars/${userId}.png`, contents);
    console.log(`[avatars] stored ${stored.sizeInBytes} bytes at ${stored.location}`);
    return stored.location;
  }

  public exists(userId: string): boolean {
    return this.storage.read(`avatars/${userId}.png`) !== undefined;
  }
}
