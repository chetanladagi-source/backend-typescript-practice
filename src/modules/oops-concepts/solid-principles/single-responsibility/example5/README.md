# Example 5 — Logger

**Scenario:** log a levelled message, either to the console or to a file.

**Violation:** `LoggerGod` both builds the text and branches on the destination. Every new target
(HTTP collector, syslog, database) adds another branch to the same method, and changing the line
layout means touching code that owns I/O.

**Refactor:** `LogFormatter` owns the wording, the `LogSink` interface names the destination
contract, `ConsoleLogSink` and `InMemoryFileLogSink` implement it, and `Logger` just joins the two.

**Takeaway:** an `if`/`switch` over destinations inside a formatting class is the classic SRP smell.
Extracting the sink also buys you extensibility for free — new targets need no edits to `Logger`.
