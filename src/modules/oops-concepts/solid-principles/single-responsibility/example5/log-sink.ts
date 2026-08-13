// Only the contract for "where a formatted line goes".

export interface LogSink {
  write(line: string): void;
}
