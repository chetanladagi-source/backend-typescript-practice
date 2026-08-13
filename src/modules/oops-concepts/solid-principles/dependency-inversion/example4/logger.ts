// Abstraction the reporting policy depends on.

export type LogLevel = "info" | "warn" | "error";

export interface Logger {
  log(level: LogLevel, message: string): void;
}
