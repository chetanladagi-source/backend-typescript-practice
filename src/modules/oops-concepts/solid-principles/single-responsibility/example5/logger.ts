// Only pairs a formatter with a sink.

import { LogFormatter } from "./log-formatter";
import { LogLevel } from "./logger-violation";
import { LogSink } from "./log-sink";

export class Logger {
  public constructor(
    private readonly formatter: LogFormatter,
    private readonly sink: LogSink
  ) {}

  public log(level: LogLevel, message: string): void {
    this.sink.write(this.formatter.format(level, message));
  }
}
