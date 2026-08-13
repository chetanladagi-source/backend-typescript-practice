// LSP violation: ReadOnlyCloudStorage inherits save() from Storage and silently discards the write.

export class Storage {
  protected readonly bucket: Map<string, string> = new Map<string, string>();

  public constructor(public readonly name: string) {}

  public save(key: string, content: string): void {
    this.bucket.set(key, content);
    console.log(`${this.name} stored ${key}`);
  }

  public load(key: string): string | null {
    return this.bucket.get(key) ?? null;
  }
}

// Violation: Storage.save() promises load(key) returns the content afterwards; this subtype drops it silently.
export class ReadOnlyCloudStorage extends Storage {
  public override save(key: string, _content: string): void {
    console.log(`${this.name} ignored write for ${key}`);
  }
}

export function backupReport(storage: Storage, key: string, content: string): string {
  storage.save(key, content);
  const stored: string | null = storage.load(key);
  if (stored !== content) {
    throw new Error(`Broken contract: ${key} was not persisted in ${storage.name}`);
  }
  return stored;
}
