// High-level policy: builds a report and reports progress through `Logger`.

import { Logger } from "./logger";

export class ReportService {
  constructor(private readonly logger: Logger) {}

  public build(rows: readonly number[]): number {
    this.logger.log("info", `building report over ${rows.length} rows`);
    if (rows.length === 0) {
      this.logger.log("warn", "no rows supplied, total is zero");
      return 0;
    }
    const total: number = rows.reduce((sum: number, row: number) => sum + row, 0);
    this.logger.log("info", `report total ${total}`);
    return total;
  }
}
