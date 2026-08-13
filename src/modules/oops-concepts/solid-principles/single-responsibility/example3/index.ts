// Runnable entry point contrasting the god class with the SRP version.

import { CsvReportFormatter } from "./csv-report-formatter";
import { ReportFileWriter } from "./report-file-writer";
import { ReportGenerator } from "./report-generator";
import { ReportGod } from "./report-violation";
import { SalesDataSource } from "./sales-data-source";

console.log("=== Violation ===");
const god: ReportGod = new ReportGod();
god.generate("sales-god.csv");
console.log(god.read("sales-god.csv"));

console.log("=== SRP applied ===");
const writer: ReportFileWriter = new ReportFileWriter();
const generator: ReportGenerator = new ReportGenerator(
  new SalesDataSource(),
  new CsvReportFormatter(),
  writer
);
generator.generate("sales-srp.csv");
console.log(writer.read("sales-srp.csv"));
