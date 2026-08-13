// New output format added later without touching any existing file.

import { ReportExporter, ReportRow } from "./report-exporter";

export class XmlExporter implements ReportExporter {
  public readonly format: string = "xml";

  public export(rows: ReportRow[]): string {
    const body: string = rows
      .map((row: ReportRow) => `  <row id="${row.id}">${row.name}</row>`)
      .join("\n");
    return `<report>\n${body}\n</report>`;
  }
}
