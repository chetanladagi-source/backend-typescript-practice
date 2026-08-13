// Runnable entry point contrasting the god class with the SRP version.

import { ConsoleLogSink } from "./console-log-sink";
import { InMemoryFileLogSink } from "./in-memory-file-log-sink";
import { LogFormatter } from "./log-formatter";
import { Logger } from "./logger";
import { LoggerGod } from "./logger-violation";

console.log("=== Violation ===");
new LoggerGod("console").log("info", "service started");
const godFileLogger: LoggerGod = new LoggerGod("file");
godFileLogger.log("warn", "disk almost full");
godFileLogger.log("error", "write failed");

console.log("=== SRP applied ===");
const formatter: LogFormatter = new LogFormatter("app");
new Logger(formatter, new ConsoleLogSink()).log("info", "service started");

const fileSink: InMemoryFileLogSink = new InMemoryFileLogSink();
const fileLogger: Logger = new Logger(formatter, fileSink);
fileLogger.log("warn", "disk almost full");
fileLogger.log("error", "write failed");
console.log("[file] contents:", fileSink.dump());
