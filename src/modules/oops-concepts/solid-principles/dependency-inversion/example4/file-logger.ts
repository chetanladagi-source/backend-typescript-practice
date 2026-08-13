// Disk implementation of `Logger`; the file handle is simulated by an array.

import { Logger, LogLevel } from "./logger";

export class FileLogger implements Logger {
  private readonly lines: string[] = [];

  constructor(private readonly path: string) {}

  public log(level: LogLevel, message: string): void {
    const line: string = `${level.toUpperCase()} ${message}`;
    this.lines.push(line);
    console.log(`[file-logger] append ${this.path}: ${line}`);
  }

  public lineCount(): number {
    return this.lines.length;
  }
}
