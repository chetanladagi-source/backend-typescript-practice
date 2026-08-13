// Registry that maps a format name to an exporter at runtime.

import { ReportExporter, ReportRow } from "./report-exporter";

export class ExporterRegistry {
  private readonly exporters: Map<string, ReportExporter> = new Map<string, ReportExporter>();

  public register(exporter: ReportExporter): void {
    this.exporters.set(exporter.format, exporter);
    console.log(`registered exporter: ${exporter.format}`);
  }

  public export(format: string, rows: ReportRow[]): string {
    const exporter: ReportExporter | undefined = this.exporters.get(format);
    if (exporter === undefined) {
      console.log(`no exporter registered for: ${format}`);
      return "";
    }
    return exporter.export(rows);
  }
}
