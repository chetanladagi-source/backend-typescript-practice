// Bad design: reporting logic owns a file handle it never asked for.

class DiskFileLogger {
  private readonly lines: string[] = [];

  public append(line: string): void {
    this.lines.push(line);
    console.log(`[file-logger] append /var/log/reports.log: ${line}`);
  }
}

export class ReportServiceViolation {
  // VIOLATION: the concrete file logger is created here, so any test of the totals also
  // writes log files and nothing can redirect output to stdout or a metrics sink.
  private readonly logger: DiskFileLogger = new DiskFileLogger();

  public build(rows: readonly number[]): number {
    this.logger.append(`INFO building report over ${rows.length} rows`);
    const total: number = rows.reduce((sum: number, row: number) => sum + row, 0);
    this.logger.append(`INFO report total ${total}`);
    return total;
  }
}
