// Violating design: one exporter that switches on the requested file format.

export interface LegacyRow {
  id: number;
  name: string;
}

export class LegacyReportExporter {
  // OCP violation: every new output format means editing this switch.
  public export(format: string, rows: LegacyRow[]): string {
    switch (format) {
      case "csv":
        return rows.map((row: LegacyRow) => `${row.id},${row.name}`).join("\n");
      case "json":
        return JSON.stringify(rows);
      default:
        console.log(`Unsupported export format: ${format}`);
        return "";
    }
  }
}
