// Read side of storage: supported by every backend.

export interface ReadableStorage {
  readonly name: string;
  load(key: string): string | null;
}
