// Abstraction the avatar policy depends on.

export interface StoredFile {
  location: string;
  sizeInBytes: number;
}

export interface FileStorage {
  save(path: string, contents: string): StoredFile;
  read(path: string): string | undefined;
}
