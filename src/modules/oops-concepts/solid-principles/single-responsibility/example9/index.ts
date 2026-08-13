// Runnable entry point contrasting the god class with the SRP version.

import { FileStorage } from "./file-storage";
import { FileUploadGod, UploadedFile } from "./file-upload-violation";
import { FileUploadService } from "./file-upload-service";
import { UploadMetadataRepository } from "./upload-metadata-repository";
import { UploadValidator } from "./upload-validator";

const files: UploadedFile[] = [
  { name: "avatar.png", sizeInKb: 120, contents: "PNGDATA" },
  { name: "notes.txt", sizeInKb: 10, contents: "hello" },
  { name: "huge.pdf", sizeInKb: 5000, contents: "PDFDATA" }
];

console.log("=== Violation ===");
const god: FileUploadGod = new FileUploadGod();
for (const file of files) {
  god.upload(file);
}

console.log("=== SRP applied ===");
const metadata: UploadMetadataRepository = new UploadMetadataRepository();
const service: FileUploadService = new FileUploadService(
  new UploadValidator(1024, [".png", ".pdf"]),
  new FileStorage("/uploads/"),
  metadata
);
for (const file of files) {
  service.upload(file);
}
console.log("[service] accepted uploads:", metadata.count());
