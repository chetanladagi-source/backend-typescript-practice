// Test double for `Logger` that keeps every line for assertions.

import { Logger, LogLevel } from "./logger";

export class CollectingLogger implements Logger {
  private readonly entries: string[] = [];

  public log(level: LogLevel, message: string): void {
    this.entries.push(`${level}:${message}`);
  }

  public entriesFor(level: LogLevel): string[] {
    return this.entries.filter((entry: string) => entry.startsWith(`${level}:`));
  }

  public all(): readonly string[] {
    return this.entries;
  }
}
