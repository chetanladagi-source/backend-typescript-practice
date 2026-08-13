// Only decides how a log line reads.

import { LogLevel } from "./logger-violation";

export class LogFormatter {
  public constructor(private readonly prefix: string) {}

  public format(level: LogLevel, message: string): string {
    return this.prefix + " [" + level.toUpperCase() + "] " + message;
  }
}
