// Only orchestrates validate, store and record.

import { FileStorage } from "./file-storage";
import { UploadMetadataRepository } from "./upload-metadata-repository";
import { UploadValidator } from "./upload-validator";
import { UploadedFile } from "./file-upload-violation";

export class FileUploadService {
  public constructor(
    private readonly validator: UploadValidator,
    private readonly storage: FileStorage,
    private readonly metadata: UploadMetadataRepository
  ) {}

  public upload(file: UploadedFile): boolean {
    const errors: string[] = this.validator.validate(file);
    if (errors.length > 0) {
      console.log("[service] rejected", file.name + ":", errors.join("; "));
      return false;
    }

    const path: string = this.storage.store(file);
    this.metadata.record({ name: file.name, sizeInKb: file.sizeInKb, storedAt: path });
    return true;
  }
}
