// Only renders report rows as CSV text.

import { SalesRow } from "./report-violation";

export class CsvReportFormatter {
  public format(rows: SalesRow[]): string {
    const body: string[] = rows.map((row: SalesRow) => row.region + "," + row.amount.toFixed(2));
    return ["region,amount", ...body].join("\n") + "\n";
  }
}
