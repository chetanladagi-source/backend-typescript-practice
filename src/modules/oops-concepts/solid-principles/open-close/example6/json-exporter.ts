// JSON output format.

import { ReportExporter, ReportRow } from "./report-exporter";

export class JsonExporter implements ReportExporter {
  public readonly format: string = "json";

  public export(rows: ReportRow[]): string {
    return JSON.stringify(rows);
  }
}
