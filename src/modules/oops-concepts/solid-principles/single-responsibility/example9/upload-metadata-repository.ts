// Only records what was uploaded and where.

export interface UploadMetadata {
  name: string;
  sizeInKb: number;
  storedAt: string;
}

export class UploadMetadataRepository {
  private readonly rows: UploadMetadata[] = [];

  public record(metadata: UploadMetadata): void {
    this.rows.push(metadata);
    console.log("[metadata] recorded", metadata.name, "rows:", this.rows.length);
  }

  public count(): number {
    return this.rows.length;
  }
}
