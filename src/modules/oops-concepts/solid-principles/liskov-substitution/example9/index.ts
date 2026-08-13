// Runnable entry point: violating design first, then the LSP-compliant design.

import { Storage, ReadOnlyCloudStorage, backupReport as badBackupReport } from "./storage-violation";
import { MemoryStorage } from "./memory-storage";
import { ArchiveStorage } from "./archive-storage";
import { backupReport, restoreReport } from "./backup-service";

export function run(): void {
  console.log("=== Violation ===");
  console.log(`Backed up: ${badBackupReport(new Storage("PrimaryStorage"), "report.csv", "id,total")}`);
  try {
    console.log(`Backed up: ${badBackupReport(new ReadOnlyCloudStorage("ColdStorage"), "report.csv", "id,total")}`);
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  const primary: MemoryStorage = new MemoryStorage();
  console.log(`Backed up: ${backupReport(primary, "report.csv", "id,total")}`);
  restoreReport(primary, "report.csv");
  restoreReport(new ArchiveStorage([["2023-report.csv", "id,total"]]), "report.csv");
}

run();
