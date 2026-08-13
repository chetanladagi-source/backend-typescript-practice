// Only writes lines to the console.

import { LogSink } from "./log-sink";

export class ConsoleLogSink implements LogSink {
  public write(line: string): void {
    console.log("[sink:console]", line);
  }
}
