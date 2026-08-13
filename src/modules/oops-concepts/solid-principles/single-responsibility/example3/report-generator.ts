// Only orchestrates fetch, format and export for a report.

import { CsvReportFormatter } from "./csv-report-formatter";
import { ReportFileWriter } from "./report-file-writer";
import { SalesDataSource } from "./sales-data-source";
import { SalesRow } from "./report-violation";

export class ReportGenerator {
  public constructor(
    private readonly dataSource: SalesDataSource,
    private readonly formatter: CsvReportFormatter,
    private readonly writer: ReportFileWriter
  ) {}

  public generate(fileName: string): void {
    const rows: SalesRow[] = this.dataSource.fetch();
    this.writer.write(fileName, this.formatter.format(rows));
  }
}
