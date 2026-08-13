// Only decides whether a file may be accepted.

import { UploadedFile } from "./file-upload-violation";

export class UploadValidator {
  public constructor(
    private readonly maxSizeInKb: number,
    private readonly allowedExtensions: string[]
  ) {}

  public validate(file: UploadedFile): string[] {
    const errors: string[] = [];
    if (file.sizeInKb > this.maxSizeInKb) {
      errors.push("file exceeds " + String(this.maxSizeInKb) + "KB");
    }
    if (!this.allowedExtensions.some((extension: string) => file.name.endsWith(extension))) {
      errors.push("unsupported type, allowed: " + this.allowedExtensions.join(", "));
    }
    return errors;
  }
}
