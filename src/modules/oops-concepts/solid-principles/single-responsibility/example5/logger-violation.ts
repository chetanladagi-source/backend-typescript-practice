// God logger, kept as the "before" picture.

export type LogLevel = "info" | "warn" | "error";

// SRP violation: message layout and destination handling are decided by one class.
export class LoggerGod {
  private readonly fileLines: string[] = [];

  public constructor(private readonly destination: "console" | "file") {}

  public log(level: LogLevel, message: string): void {
    const line: string = "[" + level.toUpperCase() + "] " + message;
    if (this.destination === "console") {
      console.log("[god:console]", line);
      return;
    }
    this.fileLines.push(line);
    console.log("[god:file] appended line, total:", this.fileLines.length);
  }
}
