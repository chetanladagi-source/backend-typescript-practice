// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyReportExporter, LegacyRow } from "./export-violation";
import { ReportRow } from "./report-exporter";
import { CsvExporter } from "./csv-exporter";
import { JsonExporter } from "./json-exporter";
import { XmlExporter } from "./xml-exporter";
import { ExporterRegistry } from "./exporter-registry";

const rows: ReportRow[] = [
  { id: 1, name: "keyboard" },
  { id: 2, name: "monitor" },
];

console.log("=== Violation ===");
const legacy: LegacyReportExporter = new LegacyReportExporter();
const legacyRows: LegacyRow[] = rows;
for (const format of ["csv", "json", "xml"]) {
  console.log(`--- ${format} ---`);
  console.log(legacy.export(format, legacyRows));
}

console.log("\n=== OCP applied ===");
const registry: ExporterRegistry = new ExporterRegistry();
registry.register(new CsvExporter());
registry.register(new JsonExporter());
console.log(registry.export("csv", rows));
console.log(registry.export("json", rows));

console.log("\n=== Extension without modification ===");
registry.register(new XmlExporter());
console.log(registry.export("xml", rows));
