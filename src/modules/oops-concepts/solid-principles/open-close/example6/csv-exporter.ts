// CSV output format.

import { ReportExporter, ReportRow } from "./report-exporter";

export class CsvExporter implements ReportExporter {
  public readonly format: string = "csv";

  public export(rows: ReportRow[]): string {
    const header: string = "id,name";
    const body: string = rows.map((row: ReportRow) => `${row.id},${row.name}`).join("\n");
    return `${header}\n${body}`;
  }
}
