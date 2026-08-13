// God file upload class, kept as the "before" picture.

export interface UploadedFile {
  name: string;
  sizeInKb: number;
  contents: string;
}

// SRP violation: validation, byte storage and metadata bookkeeping in one method.
export class FileUploadGod {
  private readonly blobs: Map<string, string> = new Map<string, string>();
  private readonly metadata: Array<{ name: string; sizeInKb: number; storedAt: string }> = [];

  public upload(file: UploadedFile): boolean {
    if (file.sizeInKb > 1024) {
      console.log("[god] rejected", file.name, "- too large");
      return false;
    }
    if (!file.name.endsWith(".png") && !file.name.endsWith(".pdf")) {
      console.log("[god] rejected", file.name, "- unsupported type");
      return false;
    }

    const path: string = "/uploads/" + file.name;
    this.blobs.set(path, file.contents);
    this.metadata.push({ name: file.name, sizeInKb: file.sizeInKb, storedAt: path });
    console.log("[god] stored", path, "metadata rows:", this.metadata.length);
    return true;
  }
}
