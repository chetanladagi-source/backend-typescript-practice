// Only appends lines to a simulated log file.

import { LogSink } from "./log-sink";

export class InMemoryFileLogSink implements LogSink {
  private readonly lines: string[] = [];

  public write(line: string): void {
    this.lines.push(line);
    console.log("[sink:file] appended line, total:", this.lines.length);
  }

  public dump(): string[] {
    return [...this.lines];
  }
}
