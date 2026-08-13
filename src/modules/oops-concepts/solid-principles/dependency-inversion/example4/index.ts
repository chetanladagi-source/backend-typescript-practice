// Runnable entry point contrasting the file-bound reporter with the injected one.

import { CollectingLogger } from "./collecting-logger";
import { FileLogger } from "./file-logger";
import { ReportService } from "./report-service";
import { ReportServiceViolation } from "./report-service-violation";

const rows: readonly number[] = [10, 25, 40];

console.log("=== Violation ===");
const hardWired: ReportServiceViolation = new ReportServiceViolation();
console.log("[violation] total:", hardWired.build(rows));

console.log("=== DIP applied ===");
const fileLogger: FileLogger = new FileLogger("/var/log/reports.log");
const production: ReportService = new ReportService(fileLogger);
console.log("[production] total:", production.build(rows), "lines:", fileLogger.lineCount());

const collecting: CollectingLogger = new CollectingLogger();
const underTest: ReportService = new ReportService(collecting);
underTest.build([]);
console.log("[test] warnings:", collecting.entriesFor("warn"));
console.log("[test] captured:", collecting.all().length, "entries with no disk writes");
